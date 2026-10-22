/* Accessible controls for the audio-owned GuidedStudySession. No simulation loop. */
(function (root, factory) {
  'use strict';
  if (typeof module === 'object' && module.exports) module.exports = factory;
  else root.GuidedStudyPlayer = factory(root);
}(typeof window === 'object' ? window : globalThis, function (host) {
  'use strict';
  function mount(options) {
    options = options || {};
    var doc = host.document, home = doc.getElementById('home'), menu = doc.getElementById('homeMenu');
    if (!home) throw Error('Guided player requires #home');
    if (!host.GuidedStudySession) throw Error('Load GuidedStudySession before the player');
    if (doc.getElementById('guidedStudyPlayer')) throw Error('Guided player is already mounted');
    var lessons = options.lessons || [], byId = new Map(lessons.map(function (l) { return [l.id, l]; }));
    var disposed = false, initialized = false, playPending = false, localError = '', frame = 0, ticking = false, session;
    var listeners = [], renderedLesson = null, renderedCue = null, clip = null, focusedScene = null;
    function node(tag, text, attrs, parent) {
      var el = doc.createElement(tag);
      if (text != null) el.textContent = text;
      Object.keys(attrs || {}).forEach(function (key) { el.setAttribute(key, attrs[key]); });
      if (parent) parent.appendChild(el);
      return el;
    }
    function listen(el, type, handler, capture) {
      el.addEventListener(type, handler, capture || false);
      listeners.push(function () { el.removeEventListener(type, handler, capture || false); });
    }
    function write(el, value) { if (el.textContent !== value) el.textContent = value; }
    function clock(seconds) {
      var t = Math.max(0, Number(seconds) || 0);
      return Math.floor(t / 60) + ':' + (t % 60 < 10 ? '0' : '') + (t % 60).toFixed(1);
    }
    function button(label, action, parent) { return node('button', label, { type: 'button', 'data-guided-action': action }, parent); }
    function field(label, tag, attrs, parent) {
      var wrap = node('label', null, { class: 'gs-field' }, parent);
      node('span', label, null, wrap);
      return node(tag, null, attrs, wrap);
    }
    var card = node('details', null, { id: 'guidedStudyPlayer', class: 'gs-player', open: '' });
    var summary = node('summary', null, null, card);
    node('strong', 'Guided study', null, summary);
    var compactStatus = node('span', 'Choose a lesson', { class: 'gs-summary-state' }, summary);
    var panel = node('div', null, { class: 'gs-panel' }, card);
    var lessonSelect = field('Lesson', 'select', { 'data-guided-lesson': '', 'aria-label': 'Guided lesson' }, panel);
    node('option', 'Choose a lesson', { value: '' }, lessonSelect);
    var previewSelect = lessons.some(function (l) { return !l.audio; }) ? field('Manual scene previews (no audio)', 'select', { 'data-guided-preview': '', 'aria-label': 'Manual scene preview' }, panel) : null;
    if (previewSelect) node('option', 'Choose a manual preview', { value: '' }, previewSelect);
    var catalog = options.catalog, listed = new Set();
    if (catalog && Array.isArray(catalog.segments)) catalog.segments.forEach(function (item) {
      var l = byId.get(item.id); listed.add(item.id);
      node('option', item.id + ' · ' + (l && l.title || item.title || item.id) + (l ? '' : ' · not integrated'), l ? { value: l.id } : { value: item.id, disabled: '' }, l && !l.audio ? previewSelect : lessonSelect);
    });
    lessons.forEach(function (l) { if (!listed.has(l.id)) node('option', l.id + ' · ' + (l.title || l.id), { value: l.id }, l.audio ? lessonSelect : previewSelect); });
    var sectionControls = node('div', null, { class: 'gs-row', role: 'group', 'aria-label': 'Lesson sections' }, panel);
    var previousSection = button('Previous section', 'previous-section', sectionControls), nextSection = button('Next section', 'next-section', sectionControls);
    var availableSections = lessons.filter(function (l) { return l.audio; }).slice().sort(function (a, b) { return a.id.localeCompare(b.id); });
    if (catalog) {
      var rollout = node('details', null, { class: 'gs-transcript' }, panel);
      node('summary', 'Course availability and visual limits', null, rollout);
      node('p', availableSections.length + ' audio sections are integrated in this private candidate. Other course sections remain disabled until their audio and scene bindings are integrated. Each scene identifies model reconstructions or explanation-only content. The source draft records ' + catalog.declaredGapClips + ' clips with capability gaps; loaded metadata alone does not resolve those gaps. Listening, physical iPad and specialist review remain pending.', { class: 'gs-note', 'data-guided-rollout': '' }, rollout);
    }
    var modes = node('div', null, { class: 'gs-row', role: 'group', 'aria-label': 'Learning mode' }, panel);
    var guidedButton = button('Open Guided (paused)', 'guided', modes), exploreButton = button('Explore', 'explore', modes);
    var showSceneButton = button('Show scene', 'show-scene', modes);
    var modeNote = node('p', 'Guided controls the scene with narration. Explore gives you control without losing your guided place.', { class: 'gs-note', 'data-guided-mode-note': '' }, panel);
    var controls = node('div', null, { class: 'gs-row gs-transport', role: 'group', 'aria-label': 'Narration and scene controls' }, panel);
    var playButton = button('Play narration', 'play', controls), backButton = button('Back', 'back', controls), replayButton = button('Replay scene', 'replay', controls), nextButton = button('Next', 'next', controls);
    var timeline = node('div', null, { class: 'gs-timeline' }, panel);
    var seek = field('Narration position', 'input', { type: 'range', min: '0', max: '0', step: '0.01', value: '0', 'data-guided-seek': '' }, timeline);
    var position = node('output', '0:00.0', { 'data-guided-position': '', 'aria-label': 'Narration time' }, timeline);
    var cueSelect = field('Scene', 'select', { 'data-guided-cue': '', 'aria-label': 'Guided scene' }, panel);
    var current = node('p', 'Choose a lesson to open its first scene, paused.', { class: 'gs-current', 'data-guided-current': '' }, panel);
    var representation = node('p', '', { class: 'gs-note', 'data-guided-representation': '', hidden: '' }, panel);
    var flags = node('p', '', { class: 'gs-note', 'data-guided-flags': '' }, panel);
    var status = node('p', '', { class: 'gs-status', role: 'status', 'aria-live': 'polite', 'data-guided-status': '' }, panel);
    var error = node('p', '', { class: 'gs-error', role: 'alert', 'data-guided-error': '', hidden: '' }, panel);
    var transcriptDetails = node('details', null, { class: 'gs-transcript' }, panel);
    node('summary', 'Transcript and source', null, transcriptDetails);
    var transcript = node('div', 'Select a lesson to read its transcript.', { class: 'gs-transcript-text', 'data-guided-transcript': '' }, transcriptDetails);
    var sources = node('p', '', { class: 'gs-source', 'data-guided-source': '' }, transcriptDetails);
    var audio = node('audio', null, { preload: 'metadata', 'aria-label': 'Lesson narration', hidden: '' }, panel);
    audio.controls = false;
    if (menu && menu.parentNode === home) home.insertBefore(card, menu); else home.insertBefore(card, home.firstChild);

    function sourceText(l) {
      var items = l.sources || (l.source ? [l.source] : []);
      if (!Array.isArray(items)) items = [items];
      var text = items.map(function (item) { return typeof item === 'string' ? item : item && (item.label || item.title || item.id || item.url); }).filter(Boolean).join(' · ');
      return text || l.sourceLabel || 'Source details not supplied for this lesson.';
    }
    function cueText(cue, index) { return cue ? (cue.text || cue.transcript || cue.narration || cue.description || cue.title || cue.label || 'Scene ' + (index + 1)) : 'Before the first scene.'; }
    function render(state) {
      if (disposed) return;
      var l = byId.get(state.lessonId), cues = l && l.cues || [], cue = cues[state.cueIndex], isGuided = state.mode === 'guided', ready = initialized && !!l;
      lessonSelect.value = l && l.audio ? l.id : '';
      if (previewSelect) previewSelect.value = l && !l.audio ? l.id : '';
      var sectionIndex = availableSections.findIndex(function (item) { return item.id === state.lessonId; });
      previousSection.disabled = state.busy || sectionIndex <= 0;
      nextSection.disabled = state.busy || sectionIndex < 0 || sectionIndex >= availableSections.length - 1;
      guidedButton.disabled = !l || state.busy;
      guidedButton.textContent = !initialized ? 'Open Guided (paused)' : isGuided ? 'Guided' : 'Return to Guided (paused)';
      guidedButton.setAttribute('aria-pressed', String(isGuided && initialized));
      exploreButton.disabled = !l || !initialized && state.mode !== 'explore';
      exploreButton.setAttribute('aria-pressed', String(!isGuided));
      showSceneButton.disabled = !ready || !isGuided || state.busy;
      playButton.textContent = state.playing ? 'Pause narration' : 'Play narration';
      playButton.disabled = !state.playing && (!ready || !isGuided || !state.playable || state.busy || playPending || !!state.error || !!localError);
      backButton.disabled = !ready || !isGuided || state.busy || state.cueIndex <= 0;
      nextButton.disabled = !ready || !isGuided || state.busy || state.cueIndex >= cues.length - 1;
      replayButton.disabled = !ready || !isGuided || state.busy || state.cueIndex < 0;
      cueSelect.disabled = !ready || !isGuided || state.busy || !cues.length;
      seek.disabled = !ready || !isGuided || !state.playable;
      seek.max = String(state.playable && l.audio ? l.audio.duration : 0);
      seek.value = String(state.audioTime);
      seek.setAttribute('aria-valuetext', clock(state.audioTime));
      write(position, state.playable ? clock(state.audioTime) + ' / ' + clock(l.audio.duration) : 'Manual scenes · no narration clock');
      if (renderedLesson !== state.lessonId) {
        renderedLesson = state.lessonId; renderedCue = undefined;
        cueSelect.replaceChildren();
        cues.forEach(function (c, i) { node('option', (i + 1) + '. ' + (c.title || c.label || cueText(c, i)), { value: c.id }, cueSelect); });
        write(transcript, l ? l.transcript || l.narrationText || cues.map(cueText).join('\n\n') || 'Transcript not supplied for this lesson.' : 'Select a lesson to read its transcript.');
        write(sources, l ? sourceText(l) : '');
      }
      cueSelect.value = state.cueId || '';
      if (renderedCue !== state.cueId || !l) {
        renderedCue = state.cueId;
        write(current, l ? cueText(cue, state.cueIndex) : 'Choose a lesson to open its first scene, paused.');
        var detail = cue && cue.scene && typeof cue.scene.detail === 'string' ? cue.scene.detail.trim() : '';
        write(representation, detail ? 'Representation: ' + detail : '');
        representation.hidden = !detail;
      }
      write(modeNote, !isGuided ? 'Explore: you control the simulator. Your guided place is saved at ' + clock(state.audioTime) + '. Return to Guided restores it, paused.' : 'Guided: narration controls the scene. Touching a simulator control switches to Explore and pauses narration.');
      var extra = l ? [l.status, l.audioStatus, l.alignmentStatus].filter(function (x) { return typeof x === 'string' && x; }).join(' · ') : '';
      write(flags, l ? (state.playable ? 'Audio available' : 'Text only · narration unavailable; use the scene controls') + (extra ? ' · ' + extra : '') : '');
      write(status, state.busy ? 'Preparing scene…' : !l ? 'Choose a lesson. Nothing plays automatically.' : !initialized ? 'Saved position ready. Open Guided to restore the scene, paused.' : !isGuided ? 'Explore mode · narration paused' : state.playing ? 'Guided mode · narration playing' : 'Guided mode · paused');
      var message = localError || state.error || state.storageError || '';
      write(error, message); error.hidden = !message;
      write(compactStatus, l ? (l.title || l.id) + ' · ' + (!isGuided ? 'Explore' : state.playing ? 'Playing' : 'Paused') : 'Choose a lesson');
      panel.setAttribute('aria-busy', String(state.busy));
      followScene(state, false);
      syncLoop(state);
    }
    function followScene(state, force) {
      if (state.mode !== 'guided') { focusedScene = null; return; }
      if (!initialized || state.busy || state.error || typeof doc.querySelector !== 'function') return;
      var l = byId.get(state.lessonId), cue = l && l.cues[state.cueIndex], scene = cue && cue.scene;
      if (!scene) return;
      var key = [state.lessonId, scene.organ, scene.route, scene.stage, scene.monitoringView, scene.preset].join('|');
      if (!force && focusedScene === key) return;
      var selectors = scene.organ === 'heart' ? ['#heartV3Study .heart-v3-viewport', '#heartV3Study [data-h3-fallback]:not([hidden])'] : scene.organ === 'lead' ? ['#leadPlacementHome .lead-3d-viewport', '#lead2DFallback:not([hidden])'] : scene.organ === 'respiratory' ? scene.monitoringView === 'capnography' ? ['#cardiorespiratoryStudy [data-cap-marker]'] : ['#cardiorespiratoryStudy .sim-breath-viewport', '#cardiorespiratoryStudy [data-explorer-fallback]'] : ['#guidedExplanationStudy'];
      for (var i = 0; i < selectors.length; i++) {
        var target = doc.querySelector(selectors[i]);
        if (target && scene.monitoringView === 'capnography') target = target.closest('section');
        if (!target || typeof target.getBoundingClientRect !== 'function' || typeof target.scrollIntoView !== 'function') continue;
        var bounds = target.getBoundingClientRect();
        if (!bounds.height) continue;
        focusedScene = key;
        if (force || bounds.top < 65 || bounds.bottom > (host.innerHeight || 768)) target.scrollIntoView({ block: 'center', behavior: 'auto' });
        return;
      }
    }
    function syncLoop(state) {
      if (disposed || doc.hidden || !state.playing || state.mode !== 'guided') {
        if (frame) host.cancelAnimationFrame(frame);
        frame = 0; return;
      }
      if (!frame && !ticking) frame = host.requestAnimationFrame(advance);
    }
    async function advance() {
      frame = 0;
      if (disposed || doc.hidden || !session.inspect().playing) return;
      ticking = true;
      try { await session.tick(); } catch (e) { fail(e); }
      finally { ticking = false; if (!disposed) syncLoop(session.inspect()); }
    }
    function fail(e) {
      localError = e && e.message || String(e);
      if (session) { session.enterExplore(); render(session.inspect()); }
    }
    function action(work, prepared, follow) {
      localError = '';
      if (follow) focusedScene = null;
      var result;
      try { result = work(); } catch (e) { fail(e); return Promise.resolve(false); }
      return Promise.resolve(result).then(function (ok) { if (ok && prepared) initialized = true; render(session.inspect()); return ok; }, function (e) { fail(e); return false; });
    }
    var storage = options.storage;
    if (storage === undefined) { try { storage = host.localStorage; } catch (_) { storage = null; } }
    var canResolveAudio = typeof host.fetch === 'function' && host.URL && typeof host.URL.createObjectURL === 'function' && typeof host.URL.revokeObjectURL === 'function';
    async function resolveAudio(spec, context) {
      var url = new host.URL(spec.src, doc.baseURI || host.location.href), owned = null;
      if (url.origin !== host.location.origin) throw Error('Narration media must use a same-origin asset.');
      if (clip && clip.key === url.href) return context.isCurrent() && !disposed ? clip.url : null;
      try {
        var response = await host.fetch(url.href, { signal: context.signal, credentials: 'same-origin', mode: 'same-origin' });
        if (!context.isCurrent() || disposed) return null;
        if (!response.ok || response.status === 206) throw Error('Narration download failed (HTTP ' + response.status + ').');
        var blob = await response.blob();
        if (!context.isCurrent() || disposed) return null;
        if (!blob || !blob.size) throw Error('Narration download returned an empty clip.');
        owned = host.URL.createObjectURL(blob);
        if (!context.isCurrent() || disposed) { host.URL.revokeObjectURL(owned); owned = null; return null; }
        var candidate = owned, settled = false;
        owned = null;
        // Attachment adopts this lease synchronously. A cancellation between
        // resolution and attachment can release only its own candidate URL.
        return { src: candidate, commit: function () {
          if (settled) return;
          settled = true;
          var prior = clip;
          clip = { key: url.href, url: candidate };
          if (prior) host.URL.revokeObjectURL(prior.url);
        }, release: function () {
          if (!settled) { settled = true; host.URL.revokeObjectURL(candidate); }
        } };
      } catch (e) {
        if (owned) host.URL.revokeObjectURL(owned);
        if (!context.isCurrent() || disposed) return null;
        throw e;
      }
    }
    session = host.GuidedStudySession.create({ lessons: lessons, audio: audio, adapters: options.adapters, storage: storage, onChange: render, resolveAudio: canResolveAudio ? resolveAudio : undefined });
    listen(lessonSelect, 'change', function () { if (lessonSelect.value) load(lessonSelect.value); });
    if (previewSelect) listen(previewSelect, 'change', function () { if (previewSelect.value) load(previewSelect.value); });
    listen(guidedButton, 'click', function () {
      if (initialized && session.inspect().mode === 'guided') return;
      action(function () { return session.inspect().mode === 'explore' ? session.returnGuided() : session.load(session.inspect().lessonId); }, true);
    });
    listen(exploreButton, 'click', function () { action(function () { return session.enterExplore(); }); });
    listen(showSceneButton, 'click', function () { followScene(session.inspect(), true); });
    listen(playButton, 'click', function () {
      if (session.inspect().playing) { action(function () { return session.pause(); }); return; }
      // Call play before a promise/await so the HTMLAudioElement retains the gesture.
      var result = action(function () { return session.play(); }, false, true);
      playPending = true; render(session.inspect());
      result.finally(function () { playPending = false; render(session.inspect()); });
    });
    listen(backButton, 'click', function () { action(function () { return session.back(); }, false, true); });
    listen(nextButton, 'click', function () { action(function () { return session.next(); }, false, true); });
    function adjacentSection(offset) {
      var index = availableSections.findIndex(function (item) { return item.id === session.inspect().lessonId; });
      var item = availableSections[index + offset];
      if (index >= 0 && item) load(item.id);
    }
    listen(previousSection, 'click', function () { adjacentSection(-1); });
    listen(nextSection, 'click', function () { adjacentSection(1); });
    listen(replayButton, 'click', function () { action(function () { return session.replay(); }, false, true); });
    listen(cueSelect, 'change', function () { action(function () { return session.seekCue(cueSelect.value); }, false, true); });
    listen(seek, 'input', function () { action(function () { return session.seek(Number(seek.value)); }, false, true); });
    function manual(event) {
      if (!event.isTrusted || disposed || !session.inspect().lessonId || session.inspect().mode !== 'guided') return;
      var target = event.target;
      if (!target || card.contains(target) || !target.closest) return;
      var simulator = target.closest('#heartV3Study, #cardiorespiratoryStudy, #leadPlacementHome');
      var navigation = target.closest('button, a[href], select, input[type="button"], input[type="submit"], [role="button"], [onclick], [onchange]');
      if (!simulator && (!navigation || navigation.disabled || !navigation.closest('#home, #quiz, #results, header'))) return;
      if (event.type === 'keydown' && ['Shift', 'Control', 'Alt', 'Meta', 'Tab', 'Escape'].includes(event.key)) return;
      // Release before simulator input or global navigation can close its scene.
      session.enterExplore();
    }
    ['pointerdown', 'keydown', 'change'].forEach(function (type) { listen(doc, type, manual, true); });
    listen(doc, 'visibilitychange', function () { if (doc.hidden) action(function () { return session.pause(); }); });
    listen(audio, 'error', function () { fail(Error('Lesson narration could not load. Explore the scene or choose another lesson.')); });
    listen(audio, 'timeupdate', function () {
      var state = session.inspect();
      // Software rendering can stall compositor RAFs while the media clock and
      // media events continue. Use that existing clock to wake the same awaited
      // update pipeline; do not create a timer or a competing model loop.
      if (disposed || !initialized || doc.hidden || ticking || state.busy || !state.playing || state.mode !== 'guided' || audio.paused || audio.currentTime - state.audioTime < .1) return;
      if (frame) host.cancelAnimationFrame(frame);
      frame = 0;
      advance();
    });
    listen(audio, 'ended', function () { if (session.inspect().playing) action(function () { return session.tick(); }); });
    function load(id) { initialized = false; return action(function () { return session.load(id); }, true, true); }
    function dispose() {
      if (disposed) return;
      disposed = true;
      if (frame) host.cancelAnimationFrame(frame);
      frame = 0; listeners.forEach(function (off) { off(); }); session.dispose();
      if (clip) { audio.removeAttribute('src'); if (typeof audio.load === 'function') audio.load(); host.URL.revokeObjectURL(clip.url); clip = null; }
      card.remove();
    }
    render(session.inspect());
    return { element: card, audio: audio, session: session, ready: Promise.resolve(true), load: load, inspect: function () { return session.inspect(); }, dispose: dispose };
  }
  return { mount: mount };
}));
