window.projects = [
{ id:'water-treatment',title:'Water Treatment Plant',description:'A simulated three-tank water-treatment plant with PLC control and an operator interface for process monitoring, alarms, and pump control.',tags:['MATLAB','Simulink','OpenPLC','Ignition','Modbus TCP'],repo:'https://github.com/jchik1102/Water-Treatment-Plant',media:[{src:'',alt:'Water treatment operator interface',caption:'Ignition process overview'}]},
{ id:'guide-wire',title:'Guide-Wire Robot',description:'A robot that follows a guide wire using inductive sensors, with manual control through an Android app or handheld remote and an onboard camera stream.',tags:['Embedded programming','Android','Bluetooth','IR control','ESP32-CAM'],repo:'https://github.com/jchik1102/Guide-Wire-Robot',media:[{src:'',alt:'Guide-wire robot hardware',caption:'Robot photo'}]},
{ id:'stm32',title:'STM32 Development PCB',description:'A compact, four-layer STM32F103 board design with USB power, a 3.3 V supply, programming headers, and test points. Physical bring-up is pending.',tags:['KiCad','STM32','PCB layout','USB','SWD'],repo:'https://github.com/jchik1102/STM32-PCB',media:[{src:'',alt:'STM32 board render',caption:'KiCad board render'}]}
];
const projectDetails = {
  'water-treatment': {
    overview: 'This project connects a simulated water-treatment process to a PLC controller and a SCADA interface. MATLAB and Simulink represent the physical plant, OpenPLC controls the equipment and treatment sequence, and Ignition provides the operator screens. The process runs in software rather than on a physical treatment installation.',
    sections: [
      { title: 'Process model', text: 'The three-tank model represents tank levels, flows, chemical concentration, pressure, and equipment dynamics. MATLAB supplies plant parameters, controller design, scenarios, and automated checks; Simulink runs the dynamic process.' },
      { title: 'PLC control', text: 'Structured Text logic in OpenPLC handles batch sequencing, PI control, pump staging, and equipment interlocks on a 100 ms cyclic task. Modbus TCP exchanges process values and commands between the simulated plant and controller.' },
      { title: 'Operator interface', text: 'Ignition Perspective provides overview, treatment, pump, pressure, alarm, trend, maintenance, simulation, and diagnostic screens. The project includes 102 OPC tags, with setup for 18 Boolean alarms and 57 history tags. Operator requests and permitted setpoints are separate from PLC-owned outputs.' },
      { title: 'Integrated demonstration', text: 'The supplied demonstration runs for approximately 260 seconds and covers a treatment batch, pressure staging, and an injected lead-pump failure with takeover. It uses an accelerated commissioning profile rather than nominal full-size process timing.' },
      { title: 'Scope', text: 'This is an educational simulation. The repository includes the plant models, PLC source, SCADA resources, integration maps, and historical test outputs. It does not represent a commissioned physical installation.' }
    ],
    images: [
      {src:'',alt:'Simulink water-treatment plant model',caption:'Simulink plant model'},
      {src:'',alt:'Ignition process trends and alarms',caption:'Process trends and alarms'}
    ]
  },
  'guide-wire': {
    overview: 'The robot combines guide-wire navigation with manual control from an Android app or a handheld remote. Inductive sensors provide navigation input, while the firmware controls the motors and handles intersections. A separate ESP32-CAM supplies a video stream to the app.',
    sections: [
      { title: 'Guide-wire navigation', text: 'The robot reads inductive sensors to follow a wire and detect intersections. The Android app can select among three predefined paths; the robot firmware contains path selection and intersection-handling implementations.' },
      { title: 'Manual control', text: 'The Android joystick sends forward, backward, left, right, and stop commands over Bluetooth to an HC-06 module. The EFM8-based handheld remote provides another control interface using joystick input, infrared communication, and LCD feedback.' },
      { title: 'Camera and app', text: 'The ESP32-CAM hosts a Wi-Fi network and serves an MJPEG stream for the Android camera view. The app also contains a learning-mode interface with sensor recording options and a replay command.' },
      { title: 'Development scope', text: 'The repository contains robot and remote firmware, camera firmware, path configurations, and the Android Studio project. Multiple development versions are preserved, so experimental files should not be treated as interchangeable final firmware. The controls and camera require the corresponding hardware.' }
    ],
    images: [
      {src:'',alt:'Android robot control interface',caption:'Android control app'},
      {src:'',alt:'Handheld remote and guide-wire sensors',caption:'Remote and sensing hardware'}
    ]
  },
  'stm32': {
    overview: 'ENVIRO Rev B is a 50 × 44 mm, four-layer development board built around an STM32F103C8T6. The KiCad design combines USB power, a regulated 3.3 V rail, programming access, communication headers, and test points in a compact board.',
    sections: [
      { title: 'Power and USB', text: 'A Micro-B connector supplies USB power and the USB full-speed interface. The design includes USBLC6-2SC6 ESD protection, a 250 mA resettable fuse, a TLV1117LV33 regulator, decoupling, and a 3.3 V status LED.' },
      { title: 'Programming and interfaces', text: 'A five-pin SWD header exposes reference voltage, data, clock, ground, and reset. USART1 supports the STM32 system-memory serial bootloader; an I2C2 header provides additional peripheral access. BOOT0 selection and test points support planned bring-up.' },
      { title: 'Board layout', text: 'The proposed four-layer stackup uses top signal, internal ground, internal 3.3 V, and bottom signal/ground layers. Four M2 mounting holes provide mechanical attachment. The design includes provision for a 16 MHz external crystal.' },
    ],
    images: [
      {src:'',alt:'STM32 PCB routed layout',caption:'PCB layout'},
      {src:'',alt:'STM32 development board schematic',caption:'Schematic'}
    ]
  }
};
window.projects.push(
  {
    id:'revit-electrical',
    title:'Revit Electrical BIM',
    description:'An electrical building model developed in Revit, with a linked architectural model, electrical device placement, and receptacle circuit organization.',
    tags:['Revit 2027','Electrical BIM','Circuiting','Model coordination'],
    repo:null,
    media:[{src:'',alt:'Revit electrical model and linked architecture',caption:'Electrical model overview'}]
  },
  {
    id:'agrobot-power',
    title:'Agrobot Power PCB',
    description:'A KiCad power-conditioning board designed to convert a regulated 12 V input into separate 5 V and 3.3 V rails using two buck converters.',
    tags:['KiCad','Buck converters','PCB layout','Power electronics'],
    repo:'https://github.com/jchik1102/Agro-PCB',
    media:[{src:'',alt:'Agrobot dual-output power board',caption:'Agrobot power board'}]
  }
);
projectDetails['revit-electrical'] = {
  overview:'An educational electrical BIM project built in Revit 2027. The electrical model uses a linked Revit sample architectural model as its building reference, keeping the electrical work separate from the architectural source.',
  sections:[
    {title:'Model setup',text:'The project uses a separate electrical model with linked architecture positioned Origin to Origin and pinned. This provides a shared building reference for placing and organizing electrical elements.'},
    {title:'Electrical layout and circuits',text:'The electrical work includes receptacle placement and organization into circuits. Working in the building model connects device locations with their circuit assignments and panel context.'},
    {title:'Skills used',text:'The project develops practical Revit skills in linked models, electrical element placement, view navigation, circuit creation, and model organization.'},
    {title:'Project scope',text:'This is an educational modeling exercise using sample architecture. It is not a permit or construction design, and the scope does not include a completed construction drawing set.'}
  ],
  images:[
    {src:'',alt:'Revit electrical floor plan showing device locations',caption:'Electrical floor plan'},
    {src:'',alt:'Revit circuit organization and panel view',caption:'Circuit and panel view'}
  ]
};
projectDetails['agrobot-power'] = {
  overview:'A native KiCad schematic and four-layer PCB draft for a regulated 12 V input and independent 5 V and 3.3 V outputs. This project focuses on power conditioning for Agrobot electronics, with separate conversion stages and proposed input protection.',
  sections:[
    {title:'Power conversion',text:'Two LMR33630 buck converters provide the 5 V and 3.3 V rails. Each stage has its own inductor, feedback network, and output capacitors. The board contains no microcontroller or sensors.'},
    {title:'Design targets',text:'The 5 V rail targets 0.75 A continuous and 1.5 A peak output; the 3.3 V rail targets 0.5 A continuous and 1.0 A peak. Ripple targets are 20 mVpp and 10 mVpp respectively at 20 MHz bandwidth. These are design goals, not measured results, and peak duration has not been specified.'},
    {title:'Protection and layout',text:'The proposed input stage includes a resettable fuse, reverse-polarity diode, and TVS clamp. The 96 × 78 mm layout uses four copper layers, two internal ground planes, outer-layer ground zones, and four mounting holes.'},
  ],
  images:[
    {src:'',alt:'Agrobot buck converter schematic',caption:'5 V and 3.3 V converter schematic'},
    {src:'',alt:'Agrobot power PCB routing',caption:'Four-layer PCB layout'}
  ]
};
window.projects.forEach(project => { project.details = projectDetails[project.id]; });
const projectOrder = ['water-treatment', 'stm32', 'revit-electrical', 'guide-wire', 'agrobot-power'];
window.projects.sort((a, b) => {
  const rank = id => projectOrder.includes(id) ? projectOrder.indexOf(id) : projectOrder.length;
  return rank(a.id) - rank(b.id);
});
