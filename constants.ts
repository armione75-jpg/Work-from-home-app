
import { Exercise, Routine } from './types';

export const EXERCISES: Exercise[] = [
  {
    id: 'chin-tucks',
    name: 'Chin Tucks',
    subtitle: 'The Double Chin',
    category: 'Neck',
    why: 'This is the #1 corrective exercise for forward head posture. It works instantly to realign the vertebrae.',
    description: 'Realignment for forward head posture.',
    steps: [
      'Sit tall. Look straight ahead.',
      'Without tilting your head up or down, slide your chin backward as if you are trying to make a "double chin."',
      'Visualize the back of your neck getting longer.',
      'Hold for 2 seconds, then release.',
      'Repeat 10 times.'
    ],
    reps: '10 reps',
    duration: '30 sec',
    imagePrompt: 'A person sitting tall in a chair, performing a chin tuck exercise to correct forward head posture, clean minimalist illustration style, soft lighting.'
  },
  {
    id: 'yes-no',
    name: 'Yes & No',
    subtitle: 'SCM Release',
    category: 'Neck',
    why: 'The SCM muscles get short and tight when you look down. This causes headaches behind the eyes.',
    description: 'Releases the Sternocleidomastoid muscles.',
    steps: [
      'Keep your chin level.',
      'Inhale and turn your head slowly to look over your right shoulder (saying "No").',
      'Exhale and return to center. Repeat on the left.',
      'Then, look all the way up to the ceiling (stretching the throat) and down to the chest (saying "Yes").'
    ],
    reps: '5 per side',
    duration: '30 sec',
    imagePrompt: 'A minimalist illustration of a person rotating their head side to side and up and down for neck mobility, serene atmosphere.'
  },
  {
    id: 'cactus',
    name: 'The Cactus',
    subtitle: 'Chest Opener',
    category: 'Neck',
    why: 'You cannot fix the neck if the chest is tight. We need to open the "Gateway."',
    description: 'Opens the chest to allow the neck to realign.',
    steps: [
      'Sit on the edge of your chair.',
      'Raise your arms out to the sides, bending elbows at 90 degrees.',
      'Inhale: Squeeze your shoulder blades together behind you and puff your chest forward. Look up slightly.',
      'Exhale: Round your spine forward and bring your forearms to touch in front of your face.',
      'Repeat 5 times.'
    ],
    reps: '5 slow rounds',
    duration: '60 sec',
    imagePrompt: 'A person sitting in a chair with arms in a cactus position, opening their chest and squeezing shoulder blades, minimalist art style.'
  },
  {
    id: 'eagle-arms',
    name: 'Eagle Arms',
    subtitle: 'Upper Back Floss',
    category: 'Neck',
    why: 'Targets the rhomboids—the area between the shoulder blades where digital nomads carry tension.',
    description: 'Stretches the upper back and shoulder blades.',
    steps: [
      'Stretch arms forward. Cross your Right arm under your Left.',
      'Bend elbows and try to wrap forearms so palms touch (or just hug your opposite shoulders).',
      'Lift your elbows up to shoulder height.',
      'Push your forearms away from your face.',
      'Breathe into the space between your shoulder blades for 5 breaths. Switch sides.'
    ],
    duration: '1 min',
    imagePrompt: 'A person with arms wrapped in eagle pose (Garudasana arms) to stretch the upper back, clean minimalist illustration.'
  },
  {
    id: 'figure-4',
    name: 'Figure-4',
    subtitle: 'The Sciatica Saver',
    category: 'Back',
    why: 'Targets the Piriformis and outer hips. Antidote for shooting leg pain or dull glute aches.',
    description: 'Deep stretch for hips and glutes.',
    steps: [
      'Sit on the edge of your chair. Both feet flat on the floor.',
      'Cross your Right Ankle over your Left Knee.',
      'Flex your right foot (pull toes back toward the shin).',
      'Inhale: Sit tall.',
      'Exhale: Hinge forward from your hips (keep your spine straight).',
      'Hold for 5-10 breaths. Switch sides.'
    ],
    duration: '2 min',
    imagePrompt: 'A person sitting in a chair performing a figure-four hip stretch, crossing one ankle over the opposite knee, minimalist style.'
  },
  {
    id: 'seated-twist',
    name: 'Seated Twist',
    subtitle: 'The Wring-Out',
    category: 'Back',
    why: 'Twisting hydrates the spinal discs. Think of a dirty sponge—to clean it, you have to wring it out.',
    description: 'Hydrates spinal discs and improves circulation.',
    steps: [
      'Sit sideways on your chair so the backrest is to your right.',
      'Inhale and lengthen your spine upward.',
      'Exhale and twist to the right, holding the back of the chair.',
      'Use chair leverage to gently deepen the twist. Look over your right shoulder.',
      'Hold for 5 breaths. Switch sides.'
    ],
    duration: '1 min',
    imagePrompt: 'A person sitting sideways on a chair, twisting their torso to hold the backrest, minimalist illustration.'
  },
  {
    id: 'zombie',
    name: 'The Zombie',
    subtitle: 'Wrist Flossing',
    category: 'Wrists/Eyes',
    why: 'Stretches wrist extensors and flexors. Opens the "literal tunnel" in your wrist.',
    description: 'Prevents Carpal Tunnel issues.',
    steps: [
      'Extend Right Arm straight out at shoulder height, palm facing floor.',
      'Stop Sign: Pull fingers back toward face with left hand. Hold 10s.',
      'Zombie Hand: Bend wrist down so fingers point to floor. Gently press on back of hand. Hold 10s.',
      'Repeat on the Left Arm.'
    ],
    duration: '1 min',
    imagePrompt: 'A close up of hands performing wrist stretches, one hand pulling fingers back, the other pressing hand down, minimalist art.'
  },
  {
    id: 'palming',
    name: 'Palming',
    subtitle: 'Total Darkness',
    category: 'Wrists/Eyes',
    why: 'Rests the optic nerve and soothes the nervous system. Breaks the "near focus" spasm.',
    description: 'Relieves digital eye strain.',
    steps: [
      'Rub your palms together vigorously for 15 seconds until they feel hot.',
      'Close your eyes.',
      'Cup your warm palms over your eyes (do not press on eyeballs).',
      'Breathe into the darkness for 60 seconds.'
    ],
    duration: '1 min',
    imagePrompt: 'A person with their eyes closed, cupping their palms over their eyes for relaxation, serene and dark atmosphere, minimalist.'
  },
  {
    id: 'physio-sigh',
    name: 'Physiological Sigh',
    subtitle: '60-Second Reset',
    category: 'Breath',
    why: 'Fastest way to offload CO2 and lower stress in real-time. Manually reboots your operating system.',
    description: 'Immediate nervous system calming technique.',
    steps: [
      'Inhale deeply through your nose.',
      'Inhale again (a tiny sip of air on top) to fully inflate.',
      'Exhale slowly and fully through your mouth (like a sigh).',
      'Do this 3 times.'
    ],
    duration: '1 min',
    imagePrompt: 'A peaceful person taking a deep breath, soft ethereal atmosphere, minimalist illustration of breathing.'
  },
  {
    id: 'box-breathing',
    name: 'Box Breathing',
    subtitle: 'The Tactical Calm',
    category: 'Breath',
    why: 'Used by Navy SEALs to maintain high performance under extreme stress. Balances the nervous system.',
    description: 'Square breathing for focus and composure.',
    steps: [
      'Inhale slowly for 4 seconds.',
      'Hold your breath for 4 seconds.',
      'Exhale slowly for 4 seconds.',
      'Hold empty for 4 seconds.',
      'Repeat for 4 rounds.'
    ],
    duration: '2 min',
    imagePrompt: 'A geometric box shape integrated with a person breathing calmly, representing box breathing, minimalist and focused.'
  },
  {
    id: '4-7-8-breath',
    name: '4-7-8 Breath',
    subtitle: 'The Natural Tranquilizer',
    category: 'Breath',
    why: 'Acts as a natural nervous system sedative. Best for high-anxiety moments or sleep prep.',
    description: 'Ancient pranayama technique for instant relaxation.',
    steps: [
      'Exhale completely through your mouth with a whoosh sound.',
      'Close your mouth and inhale quietly through your nose to a count of 4.',
      'Hold your breath for a count of 7.',
      'Exhale completely through your mouth to a count of 8.',
      'Repeat for 4 cycles.'
    ],
    duration: '2 min',
    imagePrompt: 'A person in a state of deep relaxation, preparing for sleep, soft moonlight colors, minimalist illustration.'
  },
  {
    id: 'belly-breathing',
    name: 'Belly Breathing',
    subtitle: 'The Diaphragm Drop',
    category: 'Breath',
    why: 'Switches off the "chest breathing" response triggered by screen-staring. Lowers cortisol.',
    description: 'Foundational grounding breath.',
    steps: [
      'Place one hand on your chest and the other on your belly.',
      'Inhale slowly through your nose so your belly pushes your hand out.',
      'The hand on your chest should remain as still as possible.',
      'Exhale through pursed lips as if through a straw.',
      'Continue for 10 slow breaths.'
    ],
    duration: '3 min',
    imagePrompt: 'A person with one hand on their chest and one on their belly, demonstrating deep belly breathing, minimalist art.'
  },
  {
    id: 'bumble-bee',
    name: 'Bumble Bee Breath',
    subtitle: 'Vagus Nerve Stim',
    category: 'Breath',
    why: 'The humming vibration stimulates the Vagus Nerve, telling your brain you are safe and calm.',
    description: 'Soothing sound-based meditation.',
    steps: [
      'Sit comfortably. Close your eyes.',
      'Place your index fingers on the cartilage of your ears.',
      'Take a deep inhale through your nose.',
      'As you exhale, make a loud humming sound like a bee.',
      'Keep the hum going for the entire exhale. Repeat 5 times.'
    ],
    duration: '2 min',
    imagePrompt: 'A person with fingers on their ears, humming peacefully, vibrant sound waves illustration, minimalist.'
  }
];

export const ROUTINES: Routine[] = [
  {
    id: 'morning-flow',
    name: 'Good Morning Flow',
    description: 'Wake up your body, hydrate your brain, and align your spine.',
    totalTime: '5 min',
    imagePrompt: 'A bright morning scene with a person stretching, sunlight streaming in, minimalist and energetic illustration.',
    steps: [
      { exerciseId: 'physio-sigh', note: 'Start with 3 sighs' },
      { exerciseId: 'cactus', durationOverride: '2 min' },
      { exerciseId: 'chin-tucks' }
    ]
  },
  {
    id: 'neck-fix',
    name: '2-Minute Neck Fix',
    description: 'Remove 60lbs of pressure from your spine.',
    totalTime: '2 min',
    imagePrompt: 'A focused illustration of a neck being realigned, soft blue and white colors, minimalist and clinical but warm.',
    steps: [
      { exerciseId: 'chin-tucks' },
      { exerciseId: 'yes-no' },
      { exerciseId: 'cactus' }
    ]
  },
  {
    id: 'focus-booster',
    name: 'Focus State Protocol',
    description: 'Sharpens attention before deep work or a big meeting.',
    totalTime: '3 min',
    imagePrompt: 'A person in a state of deep focus, surrounded by a calm blue aura, minimalist and professional illustration.',
    steps: [
      { exerciseId: 'box-breathing', note: 'Focus on the edges' },
      { exerciseId: 'palming', note: 'Rest the visual system' }
    ]
  },
  {
    id: 'anxiety-switch',
    name: 'Anxiety Kill-Switch',
    description: 'Rapid reset for when you feel overwhelmed.',
    totalTime: '3 min',
    imagePrompt: 'A person transitioning from chaos to calm, soft green and white tones, minimalist and soothing illustration.',
    steps: [
      { exerciseId: 'physio-sigh', note: 'Offload CO2 fast' },
      { exerciseId: 'bumble-bee', note: 'Stimulate the Vagus nerve' }
    ]
  },
  {
    id: 'back-rescue',
    name: 'The Back Rescue',
    description: 'Rehydrate discs and release hip tension.',
    totalTime: '4 min',
    imagePrompt: 'A person stretching their back and hips, warm orange and earthy tones, minimalist and relieving illustration.',
    steps: [
      { exerciseId: 'figure-4' },
      { exerciseId: 'seated-twist' }
    ]
  },
  {
    id: 'bedtime-winddown',
    name: 'Bedtime Wind-down',
    description: 'Transition from digital noise to deep sleep.',
    totalTime: '5 min',
    imagePrompt: 'A cozy bedroom scene, soft moonlight, a person preparing for sleep, minimalist and peaceful illustration.',
    steps: [
      { exerciseId: '4-7-8-breath', note: 'The sleeping pill' },
      { exerciseId: 'belly-breathing', note: 'Ground your energy' }
    ]
  }
];
