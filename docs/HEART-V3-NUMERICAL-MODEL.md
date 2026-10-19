# Heart v3 numerical model and limits

This independently authored teaching model uses a closed lumped circulation with four chambers and systemic/pulmonary arterial and venous reservoirs. Units are mL, seconds and mmHg. Each compartment’s volume changes by inflow minus outflow. Chamber pressure combines passive stiffness and time-varying activation; ideal one-way valves use their own upstream/downstream pressure difference. No regurgitation model is claimed.

One sampled periodic solution supplies pressure, cavity volume, valve flow, resolved events and plots. Reported stroke volume, cardiac output and ejection fraction derive from that solution. Changing parameters creates a newly settled periodic experiment; it does not simulate a patient’s transient response. Supported controls are heart rate, model blood volume, systemic resistance and a ventricular active-elastance multiplier.

Physiological period is `60 / heart rate`. Viewing speed changes presentation time. UI pause is an inspection state, not cardiac arrest. ECG, nodal/working-cell voltage and calcium/tension cues are explicitly illustrative signals. They neither solve ion-channel kinetics nor compute chamber pressures from molecular events. Geometric cavity scaling is a separate teaching calibration, not an independently validated tissue-to-organ solver.

The model family was compared with [the published 2013 closed-loop cardiovascular model](https://pmc.ncbi.nlm.nih.gov/articles/PMC3751725/) and [CircAdapt’s official description](https://www.circadapt.org/simulator). This package is not a CircAdapt port and does not inherit either project’s validation. The [cardiac-cycle reference](https://openstax.org/books/anatomy-and-physiology-2e/pages/19-3-cardiac-cycle) supports qualitative relationships. This educational prototype is not a diagnostic or treatment instrument.

Exact runtime inputs and adapted-file hashes are in the package manifest. Full numerical verification belongs to the final candidate’s separate verification report; this short public note does not invent test results or clinical qualification.
