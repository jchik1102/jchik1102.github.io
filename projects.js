window.projects = [
{ id:'water-treatment',title:'Water Treatment Plant',description:'A simulated three-tank water-treatment plant with PLC control and an operator interface for process monitoring, alarms, and pump control.',tags:['MATLAB','Simulink','OpenPLC','Ignition','Modbus TCP'],repo:'https://github.com/jchik1102/Water-Treatment-Plant',media:[{src:'',alt:'Water treatment operator interface',caption:'Ignition process overview'}]},
{ id:'guide-wire',title:'Guide-Wire Robot',description:'A robot that follows a guide wire using inductive sensors, with manual control through an Android app or handheld remote and an onboard camera stream.',tags:['Embedded programming','Android','Bluetooth','IR control','ESP32-CAM'],repo:'https://github.com/jchik1102/Guide-Wire-Robot',media:[{src:'',alt:'Guide-wire robot hardware',caption:'Robot photo'}]},
{ id:'stm32',title:'STM32 Development PCB',description:'A compact, four-layer STM32F103 board design with USB power, a 3.3 V supply, programming headers, and test points. Physical bring-up is pending.',tags:['KiCad','STM32','PCB layout','USB','SWD'],repo:'https://github.com/jchik1102/STM32-PCB',media:[{src:'',alt:'STM32 board render',caption:'KiCad board render'}]}
];
const projectDetails = {
  'water-treatment': {
    overview: "This project is a software-based water-treatment system that connects a dynamic plant model, a PLC controller, and an operator interface. Three simulated tanks provide the process environment, while pumps, valves, concentration, and pressure respond to control commands. The purpose is to bring process modeling and industrial automation together in one project: the controller acts on a changing plant, and the operator can follow those changes through a SCADA interface.",
    sections: [
  {
    "title": "System planning and architecture",
    "text": "The design separates the system into three responsibilities. MATLAB and Simulink describe the process and its physical behavior; OpenPLC decides how equipment should operate; Ignition presents information and accepts operator requests. This division gives each platform a clear purpose and makes integration problems easier to isolate. The planning considerations include which values represent measurements, which signals are commands, how operating states are represented, and which component owns each output. These distinctions matter because a display request should not bypass the controller’s sequence or interlocks."
  },
  {
    "title": "Building the process model",
    "text": "The Simulink model represents tank levels, flows, chemical concentration, pressure, and equipment dynamics. Rather than treating a command as an immediate final result, the model allows the process to evolve over time. MATLAB supplies parameters, PI-controller design, operating scenarios, and automated checks. This creates a repeatable environment for investigating how the controller responds to changing conditions. Separating the plant from the control logic also makes it possible to examine whether unexpected behavior originates in the process assumptions, the controller, or the communication between them."
  },
  {
    "title": "Sequencing and closed-loop control",
    "text": "OpenPLC uses Structured Text on a 100 ms cyclic task. Its responsibilities include the treatment-batch sequence, PI loops, pump staging, interlocks, and fault response. Batch sequencing determines which stage of treatment is active, while feedback control adjusts equipment commands in response to process measurements. Pump staging addresses changing demand, and fault handling provides behavior for abnormal equipment conditions. Combining these functions demonstrates the difference between simply commanding an actuator and coordinating a process that has operating states, dependencies, and limits."
  },
  {
    "title": "Communication and operator interface",
    "text": "Modbus TCP connects the plant and controller, while Ignition exposes process information through its OPC integration. The supplied configuration includes 102 OPC tags and setup for 18 Boolean alarms and 57 history tags. Consistent register mapping and raw-to-engineering scaling are central integration concerns: a value must mean the same thing in the simulation, PLC, and display. Ignition Perspective includes process, pump, pressure, alarm, trend, and diagnostic screens. The HMI sends request bits and permitted setpoints while equipment outputs remain controller-owned."
  },
  {
    "title": "Demonstration and troubleshooting",
    "text": "The supplied integrated demonstration runs for approximately 260 seconds and includes a treatment batch, pressure staging, and an injected lead-pump failure with takeover. An accelerated commissioning profile scales treatment-tank volume and dosing capacity together so the sequence can be observed in a shorter session. The repository also provides communication smoke checks, controller acceptance scripts, and integration checks. The documented troubleshooting path distinguishes connection failures, missing tags, scaling issues, and inactive plant execution rather than treating every unexpected display as a controller fault."
  },
  {
    "title": "What the project accomplishes",
    "text": "The result is an integrated educational environment for studying plant behavior, automated control, and operator supervision together. It connects model development, PLC programming, communication mapping, and SCADA configuration in a single workflow. The repository contains the models, controller source, interface resources, and historical results needed to understand that workflow. It is a simulated installation, and its accelerated demonstration should not be interpreted as the timing or performance of a full-size physical treatment plant."
  }
],
    images: [
      {src:'',alt:'Simulink water-treatment plant model',caption:'Simulink plant model'},
      {src:'',alt:'Ignition process trends and alarms',caption:'Process trends and alarms'}
    ]
  },
  'guide-wire': {
    overview: "The guide-wire robot combines autonomous navigation, handheld remote control, an Android control app, and a live camera view on one platform. Inductive sensor readings provide information about the guide wire, and robot firmware turns those readings and incoming commands into motor actions. The project connects sensing, communication, embedded control, and a user interface, with different ways for an operator to choose and observe the robot’s behavior.",
    sections: [
  {
    "title": "Planning the system",
    "text": "The architecture separates the robot controller, handheld remote, Android app, and camera into distinct components. The robot handles sensor input and motor commands; the remote provides a physical control interface; the app supplies path selection and joystick input; and the ESP32-CAM handles video. This division makes the interfaces between components a major part of the design. Commands need consistent meanings, sensor readings need to support navigation decisions, and the user interface needs to distinguish autonomous path selection from direct manual input."
  },
  {
    "title": "Guide-wire sensing and navigation",
    "text": "The robot uses inductor readings to follow a guide wire and detect intersections. This requires translating sensor information into movement decisions rather than relying only on timed motor commands. The app offers three guide-wire path selections, with corresponding robot-code implementations for predefined intersection actions. Wire following and intersection handling address different parts of the navigation problem: one keeps the vehicle aligned with a route, while the other determines what action belongs at a decision point along that route."
  },
  {
    "title": "Manual commands and remote control",
    "text": "The Android joystick sends forward, backward, left, right, and stop commands over Bluetooth through an HC-06 module. The EFM8-based handheld remote offers a separate route for operator input using a joystick, infrared communication, and LCD feedback. Providing both interfaces brings together different communication methods around the same basic movement functions. It also gives the project a useful separation between how an operator expresses a command and how the robot firmware interprets that command to control the vehicle."
  },
  {
    "title": "Android interface and camera",
    "text": "The Android Studio project includes manual joystick screens, path selection, a learning-mode interface, and camera viewing. The learning interface contains sensor-recording options, a 20-second recording screen, and a replay command. An ESP32-CAM hosts a Wi-Fi network and serves an MJPEG stream that the app can display. Video and Bluetooth commands use separate connections, so the interface brings information from multiple parts of the system together without making the camera responsible for the robot’s navigation decisions."
  },
  {
    "title": "Development and integration",
    "text": "The repository preserves firmware variants, path configurations, and development versions alongside the Android application. This reflects the different pieces involved in bringing sensing, movement, remote input, and video together. Integration requires matching command handling to the intended firmware and checking that pin assignments correspond to the hardware being used. The preserved experimental versions provide context for the development process, but they are not interchangeable final programs. Separating robot, remote, camera, and app code makes those boundaries easier to understand."
  },
  {
    "title": "What the project accomplishes",
    "text": "The project brings several control and observation methods into one robotic platform: guide-wire navigation, app-based driving, a handheld remote, and onboard video. Its engineering focus is the coordination of those subsystems, from sensor interpretation to command delivery and user feedback. It demonstrates how an embedded robot can expose multiple operating interfaces while retaining a dedicated controller for movement. The repository supplies the software components; using the physical control and video functions requires the corresponding robot, communication modules, and camera hardware."
  }
],
    images: [
      {src:'',alt:'Android robot control interface',caption:'Android control app'},
      {src:'',alt:'Handheld remote and guide-wire sensors',caption:'Remote and sensing hardware'}
    ]
  },
  'stm32': {
    overview: "ENVIRO Rev B is a compact development-board design built around the STM32F103C8T6 microcontroller. It brings USB power, a regulated 3.3 V supply, programming access, communication headers, and test points onto a 50 × 44 mm PCB. The purpose is to provide the supporting hardware needed for embedded development in a single board, while making the power, reset, boot, and interface connections accessible.",
    sections: [
  {
    "title": "Requirements and design planning",
    "text": "The board architecture is organized around the practical needs of an embedded development platform: supplying the microcontroller, loading firmware, connecting peripherals, and accessing important signals. The resulting design exposes SWD, USART1, and I2C2 rather than enclosing the processor in a fixed application. Reset and BOOT0 selection provide control over startup behavior. These choices make the project a study in translating microcontroller support requirements into a usable schematic and PCB, with connector access and debugging considered alongside the core circuit."
  },
  {
    "title": "Power distribution and USB",
    "text": "A Micro-B connector provides the USB power input and full-speed USB interface. A TLV1117LV33 regulator creates the 3.3 V rail, with decoupling and a status LED included in the power circuit. The input also includes a 250 mA resettable fuse, and the USB interface uses USBLC6-2SC6 ESD protection. These parts serve different purposes: regulation supplies the operating voltage, decoupling supports local current demands, and protection components address specific electrical disturbances. The schematic groups these functions around the path from the connector to the processor."
  },
  {
    "title": "Programming, boot, and peripheral access",
    "text": "The five-pin SWD header carries reference voltage, data, clock, ground, and reset. USART1 provides a separate connection for the STM32 system-memory serial bootloader, and the I2C2 header exposes PB10 and PB11 for peripheral communication. BOOT0 selection allows the startup mode to be chosen before reset. Together, these interfaces give the board more than one programming path and make it possible to develop firmware without redesigning the PCB for every peripheral. The 3.3 V header connections are supply outputs or references rather than an alternate power input."
  },
  {
    "title": "Schematic-to-layout decisions",
    "text": "The proposed four-layer stackup uses a top signal layer, a solid internal ground plane, an internal 3.3 V plane, and a bottom signal/ground layer. The layout therefore has dedicated internal resources for power and return paths while leaving the outer layers for routing and component placement. USB routing is kept short over the ground plane. The design also includes provision for a 16 MHz external crystal and four M2 mounting holes. Connector positions, signal paths, and mechanical attachment all have to fit within the same compact footprint."
  },
  {
    "title": "What the design brings together",
    "text": "The project combines microcontroller support circuitry, power regulation, interface protection, programming access, and mechanical layout in editable KiCad files. Its value as a development-board design is the integration of those functions, rather than a single application-specific feature. Test points and accessible headers make the circuit easier to inspect and support the planned power-up and programming workflow. The schematic and board layout also provide a concrete basis for discussing component selection, pin assignments, and the trade-offs involved in a small embedded platform."
  }
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
  overview: "This project develops an electrical building-information model in Revit 2027 using a linked sample architectural model as the building reference. It focuses on placing electrical devices, organizing receptacle circuits, and working with the relationship between building geometry and electrical information. The objective is to build a coherent model in which device locations and circuit assignments can be understood together, rather than maintaining a drawing of symbols without electrical relationships.",
  sections: [
  {
    "title": "Planning the model structure",
    "text": "The project separates the electrical work from the architectural source. The architecture supplies the building context, while a dedicated electrical model contains the electrical elements and their organization. This establishes a clear boundary between the reference building and the work being developed. The main planning concerns are how the models align, which views are useful for device placement, and how electrical elements relate to the spaces and panel context. Keeping those concerns explicit helps prevent modeling decisions from becoming disconnected from the building."
  },
  {
    "title": "Linking and coordination",
    "text": "The architectural model is linked Origin to Origin and pinned in the electrical project. A consistent reference position allows electrical elements to be located against the same building geometry, while pinning reduces the risk of accidentally moving the link during editing. This arrangement also preserves the architectural source as a separate file. Working with linked geometry introduces an important BIM distinction: the building can provide spatial context without every visible element becoming part of the electrical model itself."
  },
  {
    "title": "Device placement and circuit organization",
    "text": "The electrical work includes receptacle placement and grouping devices into circuits. Placement establishes where a device belongs in the building; circuiting records its electrical relationship to other devices and the panel context. Both aspects are necessary for a useful electrical model. The workflow requires moving between spatial decisions in the floor plan and electrical organization in the model, so the result communicates more than device locations alone. It also provides practice selecting, inspecting, and modifying connected elements within Revit."
  },
  {
    "title": "Working through the design",
    "text": "The modeling process moves from a linked building reference to electrical element placement and then circuit organization. Each step adds a different kind of information: geometry establishes context, devices establish the layout, and circuits establish connections. View navigation and model organization support the process by making the relevant information easier to locate. The project therefore develops practical familiarity with Revit’s electrical workflow while illustrating why a model needs both readable views and consistent relationships between its elements."
  },
  {
    "title": "What the project accomplishes",
    "text": "The result is an educational electrical BIM model that brings architectural context, device locations, and receptacle circuits into one coordinated working environment. It provides a foundation for presenting the layout through model views and discussing the organization behind it. The architecture is based on a sample model, and the project’s scope is electrical modeling rather than architectural authorship. It is not a permit or construction design, and it does not include a completed construction drawing set."
  }
],
  images:[
    {src:'',alt:'Revit electrical floor plan showing device locations',caption:'Electrical floor plan'},
    {src:'',alt:'Revit circuit organization and panel view',caption:'Circuit and panel view'}
  ]
};
projectDetails['agrobot-power'] = {
  overview: "The Agrobot power board is a KiCad schematic and four-layer PCB design for converting a regulated 12 V input into separate 5 V and 3.3 V outputs. Its role is power conditioning: providing lower-voltage rails for downstream electronics rather than performing sensing or computation itself. Two buck-converter stages, proposed input protection, and dedicated grounding structures bring the conversion functions together on a 96 × 78 mm board.",
  sections: [
  {
    "title": "Requirements and planning",
    "text": "The design is framed around a regulated 12 V source and two different output-voltage requirements. The 5 V rail targets 0.75 A continuous and 1.5 A peak, while the 3.3 V rail targets 0.5 A continuous and 1.0 A peak. Defining each rail separately gives the circuit design a clearer basis for component selection and layout. Ripple targets of 20 mVpp and 10 mVpp, respectively, also establish the intended output-quality goals. These values are design targets, not measured performance, and no guaranteed peak duration is specified."
  },
  {
    "title": "Converter architecture",
    "text": "Two LMR33630 buck converters provide the independent outputs, each with its own inductor, feedback network, and output capacitors. This makes each voltage rail a separate conversion stage from the 12 V input rather than relying on one output to supply the other. The feedback networks establish the output setpoints, while the inductors and capacitors form part of the switching power path. The architecture lets the schematic clearly separate the shared input circuitry from the components belonging to each rail."
  },
  {
    "title": "Component selection and protection",
    "text": "The proposed input stage includes a resettable fuse, a reverse-polarity diode, and a TVS clamp. These components address different input concerns and must be considered together with the source and downstream converters. The relevant design questions include current requirements, voltage ratings, component losses, and how protection devices interact under a disturbance. The project assumes a regulated 12 V input; it is not presented as a supply already qualified for automotive or battery transients. Keeping the source assumption explicit helps define what the power circuit is intended to handle."
  },
  {
    "title": "PCB organization and grounding",
    "text": "The layout uses four copper layers with two internal ground planes and ground zones on the outer layers. Separate converter stages introduce placement and routing considerations around the input connection, switching components, feedback paths, and output connections. Grounding and return-current paths matter alongside the visible signal tracks, particularly in a switching supply. Four mounting holes provide a mechanical interface for the board. The layout draft therefore brings electrical topology, connection access, and physical installation into the same design space."
  },
  {
    "title": "What the design accomplishes",
    "text": "The project translates a two-rail power requirement into a native KiCad schematic and board layout with project-local component libraries. It provides an organized design for discussing how a shared input feeds independent conversion stages, how output targets influence component choices, and how those circuits are arranged on a PCB. The board contains no microcontroller or sensors, keeping its purpose focused on power distribution and conditioning for other electronics. Its contribution is the documented circuit and layout design rather than a claim of measured efficiency or ripple."
  }
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
