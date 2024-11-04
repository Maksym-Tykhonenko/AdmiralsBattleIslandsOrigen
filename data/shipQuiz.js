export const shipQuizData = [
  { 
    score:'0',
    id: 1,
    quizName: 'Famous British Islands',
    questions: [
      {
        question: 'Which island is known as the largest in the British Isles?',
        options: ['Ireland', 'Great Britain', 'Isle of Wight'],
        correctAnswer: 'Ireland',
      },
      {
        question: 'Which island is famous for its whisky production?',
        options: ['Isle of Skye', 'Islay', 'Orkney'],
        correctAnswer: 'Islay',
      },
      {
        question: 'What is the capital of the Isle of Man?',
        options: ['Douglas', 'Belfast', 'Cardiff'],
        correctAnswer: 'Douglas',
      },
      {
        question:
          'Which island is known for the famous Neolithic site Skara Brae?',
        options: ['Orkney', 'Shetland', 'Isle of Skye'],
        correctAnswer: 'Orkney',
      },
      {
        question:
          'Which island is the site of the annual Trooping the Colour ceremony?',
        options: ['Great Britain', 'Northern Ireland', 'The Mall in London'],
        correctAnswer: 'The Mall in London',
      },
      {
        question: 'What is the largest island of Scotland?',
        options: ['Isle of Mull', 'Skye', 'Lewis and Harris'],
        correctAnswer: 'Lewis and Harris',
      },
      {
        question:
          'Which island is known for its beautiful beaches and resorts?',
        options: ['Isle of Wight', 'Isle of Man', 'Anglesey'],
        correctAnswer: 'Isle of Wight',
      },
      {
        question:
          'Which island is famous for its ancient stone circles and standing stones?',
        options: ['Isle of Lewis', 'Isle of Mull', 'Skye'],
        correctAnswer: 'Isle of Lewis',
      },
      {
        question:
          'What is the name of the largest island in the Outer Hebrides?',
        options: ['Lewis', 'Harris', 'Skye'],
        correctAnswer: 'Lewis',
      },
      {
        question:
          'Which island is known for its stunning cliffs and natural beauty?',
        options: ['Shetland', 'Isle of Skye', 'Orkney'],
        correctAnswer: 'Isle of Skye',
      },
    ],
    admiralInfo: {
      image: require('../assets/image/admiral/horatio.png'),
      name: 'Horatio Nelson',
      description:
        "Horatio Nelson is perhaps the most iconic admiral in British history, celebrated for his remarkable leadership and naval victories. Born in 1758, Nelson's most famous triumph came during the Battle of Trafalgar in 1805, where his strategic genius decisively defeated the combined French and Spanish fleets. Despite losing his life in the battle, Nelson's tactics ensured Britain's naval supremacy for over a century.",
      famousQuote: 'England expects that every man will do his duty.',
    },
    isActive: true,
  },
  { 
    score:'0',
    id: 2,
    quizName: 'Famous Admirals',
    questions: [
      {
        question:
          'Who was the British admiral known for his victory at the Battle of Trafalgar?',
        options: ['John Jellicoe', 'Horatio Nelson', 'Francis Drake'],
        correctAnswer: 'Horatio Nelson',
      },
      {
        question:
          'Which admiral is known for his circumnavigation of the globe?',
        options: ['Samuel Hood', 'Francis Drake', 'Richard Howe'],
        correctAnswer: 'Francis Drake',
      },
      {
        question: 'Who commanded the British fleet at the Battle of Jutland?',
        options: ['David Beatty', 'Edward Vernon', 'Charles Napier'],
        correctAnswer: 'David Beatty',
      },
      {
        question: 'Which admiral was involved in the Battle of the Nile?',
        options: ['Horatio Nelson', 'James Gambier', 'George Anson'],
        correctAnswer: 'Horatio Nelson',
      },
      {
        question:
          'Who was the admiral that played a key role during the Napoleonic Wars?',
        options: ['Edward Vernon', 'Richard Howe', 'Charles Napier'],
        correctAnswer: 'Charles Napier',
      },
      {
        question: 'Which admiral led the British fleet during World War II?',
        options: ['Sir Dudley Pound', 'John Jellicoe', 'David Beatty'],
        correctAnswer: 'Sir Dudley Pound',
      },
      {
        question:
          'Who was the British admiral known for his raids in the Caribbean?',
        options: ['Horatio Nelson', 'Francis Drake', 'Edward Vernon'],
        correctAnswer: 'Francis Drake',
      },
      {
        question:
          'Who commanded the fleet during the American Revolutionary War?',
        options: ['Richard Howe', 'Samuel Hood', 'James Gambier'],
        correctAnswer: 'Richard Howe',
      },
      {
        question:
          'Which admiral is famous for his victory at the Battle of Cape St. Vincent?',
        options: ['Horatio Nelson', 'John Jervis', 'Edward Vernon'],
        correctAnswer: 'John Jervis',
      },
      {
        question:
          'Who is regarded as the first British admiral to circumnavigate the globe?',
        options: ['Samuel Hood', 'Francis Drake', 'James Gambier'],
        correctAnswer: 'Francis Drake',
      },
    ],
    admiralInfo: {
      image: require('../assets/image/admiral/drake.png'),
      name: 'Francis Drake',
      description:
        "Francis Drake, born in 1540, was not only a skilled admiral but also a privateer, explorer, and one of England's greatest seafarers. He was the second person to successfully circumnavigate the globe, a feat he accomplished between 1577 and 1580. Drake is also known for his role in defending England from the Spanish Armada in 1588, using his bold tactics to outmaneuver a much larger Spanish fleet. Knighted by Queen Elizabeth I, Drake became a symbol of English defiance and exploration during the Elizabethan Age.",
      famousQuote:
        'It is not that life ashore is distasteful to me. But life at sea is better.',
    },
    isActive: false,
  },
  {
    score:'0',
    id: 3,
    quizName: 'Historical Events',
    questions: [
      {
        question: 'What year did the Battle of Trafalgar take place?',
        options: ['1805', '1812', '1776'],
        correctAnswer: '1805',
      },
      {
        question: 'When did the Battle of Jutland occur?',
        options: ['1916', '1918', '1914'],
        correctAnswer: '1916',
      },
      {
        question: 'In what year was the Battle of the Nile fought?',
        options: ['1798', '1801', '1805'],
        correctAnswer: '1798',
      },
      {
        question: 'What significant event occurred in 1588?',
        options: [
          'The defeat of the Spanish Armada',
          'The Battle of Waterloo',
          'The signing of the Magna Carta',
        ],
        correctAnswer: 'The defeat of the Spanish Armada',
      },
      {
        question: 'What year was the Battle of Cape St. Vincent?',
        options: ['1797', '1799', '1805'],
        correctAnswer: '1797',
      },
      {
        question: 'Which war began in 1914?',
        options: ['World War I', 'World War II', 'The Cold War'],
        correctAnswer: 'World War I',
      },
      {
        question: 'When was the American Revolutionary War fought?',
        options: ['1775-1783', '1765-1772', '1790-1798'],
        correctAnswer: '1775-1783',
      },
      {
        question: 'What year did the Napoleonic Wars start?',
        options: ['1799', '1803', '1815'],
        correctAnswer: '1803',
      },
      {
        question:
          'In which year did Britain formally recognize the independence of the United States?',
        options: ['1783', '1789', '1776'],
        correctAnswer: '1783',
      },
      {
        question: 'When was the Battle of Waterloo fought?',
        options: ['1815', '1812', '1818'],
        correctAnswer: '1815',
      },
    ],
    admiralInfo: {
      image: require('../assets/image/admiral/vernon.png'),
      name: 'Edward Vernon',
      description:
        'Admiral Edward Vernon, born in 1684, played a significant role in British naval history, particularly in the Caribbean. He is best known for capturing the Spanish stronghold of Porto Bello in 1739, a victory that earned him widespread acclaim. Vernon was also a reformer, credited with introducing the practice of diluting sailors\' rum rations with water, a mixture later known as "grog". His influence extended beyond battles, helping to shape the discipline and welfare of the Royal Navy.',
      famousQuote: 'The fortune of war is always doubtful.',
    },
    isActive: false,
  },
  {
    score:'0',
    id: 4,
    quizName: 'Islands Geography',
    questions: [
      {
        question: 'What is the capital of Scotland?',
        options: ['Glasgow', 'Edinburgh', 'Aberdeen'],
        correctAnswer: 'Edinburgh',
      },
      {
        question: 'Which island is located off the southwest coast of England?',
        options: ['Isle of Wight', 'Isle of Man', 'Isle of Skye'],
        correctAnswer: 'Isle of Wight',
      },
      {
        question:
          'Which island group is located northeast of mainland Scotland?',
        options: ['Shetland', 'Orkney', 'Hebrides'],
        correctAnswer: 'Shetland',
      },
      {
        question:
          'What body of water separates Great Britain from mainland Europe?',
        options: ['English Channel', 'North Sea', 'Irish Sea'],
        correctAnswer: 'English Channel',
      },
      {
        question:
          'Which island is known for its historic castles and beautiful landscapes?',
        options: ['Isle of Skye', 'Isle of Wight', 'Anglesey'],
        correctAnswer: 'Isle of Skye',
      },
      {
        question: 'Which island is famous for its prehistoric monuments?',
        options: ['Isle of Lewis', 'Orkney', 'Isle of Man'],
        correctAnswer: 'Isle of Lewis',
      },
      {
        question:
          'What is the name of the largest island in the Inner Hebrides?',
        options: ['Mull', 'Skye', 'Islay'],
        correctAnswer: 'Mull',
      },
      {
        question: 'Which island is home to the famous Stonehenge?',
        options: ['Great Britain', 'Ireland', 'Isle of Man'],
        correctAnswer: 'Great Britain',
      },
      {
        question:
          'What is the name of the small island off the coast of Scotland known for its puffins?',
        options: ['Staffa', 'Sula Sgeir', 'Skye'],
        correctAnswer: 'Sula Sgeir',
      },
      {
        question:
          'Which island is known for its vibrant wildlife, including seals and otters?',
        options: ['Isle of Mull', 'Skye', 'Orkney'],
        correctAnswer: 'Orkney',
      },
    ],
    admiralInfo: {
      image: require('../assets/image/admiral/jellicoe.png'),
      name: 'John Jellicoe',
      description:
        "Admiral John Jellicoe, born in 1859, was a key figure in Britain's naval efforts during World War I. As the commander of the Grand Fleet, Jellicoe led British forces during the pivotal Battle of Jutland in 1916. While the battle's outcome was indecisive, Jellicoe's leadership prevented a German breakthrough, maintaining Britain's naval dominance. His cautious yet effective strategy, along with his deep understanding of naval warfare, made him one of the most respected military figures of his time.",
      famousQuote: 'I can lose the war in an afternoon, but I cannot win it.',
    },
    isActive: false,
  },
  {
    score:'0',
    id: 5,
    quizName: 'Notable Expeditions',
    questions: [
      {
        question:
          'Which admiral was known for mapping the Australian coastline?',
        options: ['James Cook', 'Francis Drake', 'Edward Vernon'],
        correctAnswer: 'James Cook',
      },
      {
        question: 'Who was the first to sail around the world?',
        options: ['Francis Drake', 'John Cabot', 'Horatio Nelson'],
        correctAnswer: 'Francis Drake',
      },
      {
        question: 'Which explorer is credited with discovering Hawaii?',
        options: ['James Cook', 'Francis Drake', 'Charles Darwin'],
        correctAnswer: 'James Cook',
      },
      {
        question: 'Who explored the Pacific Islands in the 18th century?',
        options: ['James Cook', 'Edward Vernon', 'John Jellicoe'],
        correctAnswer: 'James Cook',
      },
      {
        question:
          "What was the name of James Cook's ship during his first voyage?",
        options: ['The Endeavour', 'The Discovery', 'The Beagle'],
        correctAnswer: 'The Endeavour',
      },
      {
        question:
          'Which admiral made significant contributions to the mapping of the Pacific?',
        options: ['Samuel Hood', 'James Cook', 'Richard Howe'],
        correctAnswer: 'James Cook',
      },
      {
        question: 'Who was known for his explorations in the Arctic?',
        options: ['Sir John Franklin', 'John Cabot', 'James Cook'],
        correctAnswer: 'Sir John Franklin',
      },
      {
        question:
          "Which admiral's expeditions helped establish British territories in the Pacific?",
        options: ['Horatio Nelson', 'James Cook', 'Francis Drake'],
        correctAnswer: 'James Cook',
      },
      {
        question:
          "What was the primary goal of Francis Drake's circumnavigation?",
        options: ['Trade routes', 'Exploration', 'Colonization'],
        correctAnswer: 'Exploration',
      },
      {
        question: 'Who led the expedition to the South Seas?',
        options: ['James Cook', 'Samuel Hood', 'Richard Howe'],
        correctAnswer: 'James Cook',
      },
    ],
    admiralInfo: {
      image: require('../assets/image/admiral/beatty.png'),
      name: 'David Beatty',
      description:
        "David Beatty, born in 1871, was one of the most prominent British naval commanders during World War I, particularly known for his boldness and charisma. He commanded the battlecruiser fleet at the Battle of Jutland, where his aggressive tactics were both praised and criticized. Beatty later became Admiral of the Fleet and oversaw the signing of the armistice in 1918, securing the Royal Navy's position as the world's dominant maritime force. His flair and determination made him a celebrated figure in British naval history.",
      famousQuote:
        'There seems to be something wrong with our bloody ships today.',
    },
    isActive: false,
  },
  {
    score:'0',
    id: 6,
    quizName: 'Naval Terminology',
    questions: [
      {
        question: 'What is the term for a naval battle?',
        options: ['Engagement', 'Skirmish', 'Confrontation'],
        correctAnswer: 'Engagement',
      },
      {
        question: 'What does the term "flotilla" refer to?',
        options: ['A fleet of small ships', 'A single ship', 'A naval base'],
        correctAnswer: 'A fleet of small ships',
      },
      {
        question: 'What is the title for a senior naval officer?',
        options: ['Captain', 'Admiral', 'Commodore'],
        correctAnswer: 'Admiral',
      },
      {
        question: 'What is the purpose of a flagship?',
        options: [
          'A supply ship',
          'The lead ship in a fleet',
          'A reconnaissance vessel',
        ],
        correctAnswer: 'The lead ship in a fleet',
      },
      {
        question: 'What is the term for a naval blockade?',
        options: ['Embargo', 'Interdiction', 'Blockade'],
        correctAnswer: 'Blockade',
      },
      {
        question: 'What does "maneuvering" refer to in naval terms?',
        options: [
          'The movement of ships',
          'Docking procedures',
          'Crew training',
        ],
        correctAnswer: 'The movement of ships',
      },
      {
        question: 'What is a "battleship"?',
        options: [
          'A cargo ship',
          'A heavily armed warship',
          'A fishing vessel',
        ],
        correctAnswer: 'A heavily armed warship',
      },
      {
        question: 'What does "naval intelligence" refer to?',
        options: [
          'Information about naval operations',
          'Shipbuilding data',
          'Weather forecasting',
        ],
        correctAnswer: 'Information about naval operations',
      },
      {
        question: 'What is the main purpose of naval reconnaissance?',
        options: [
          'To gather information about enemy forces',
          'To conduct trade missions',
          'To perform humanitarian aid',
        ],
        correctAnswer: 'To gather information about enemy forces',
      },
      {
        question: 'What is "sea power"?',
        options: [
          'The ability to control sea lanes',
          'The number of ships in a fleet',
          'Naval aviation strength',
        ],
        correctAnswer: 'The ability to control sea lanes',
      },
    ],
    admiralInfo: {
      image: require('../assets/image/admiral/anson.png'),
      name: 'George Anson',
      description:
        "Admiral George Anson, born in 1697, made his mark through exploration and his leadership in the Royal Navy. Anson's circumnavigation of the globe between 1740 and 1744 brought him fame and fortune, as he captured vast amounts of Spanish treasure. His return to England was hailed as a great victory, and Anson was promoted to higher positions within the navy. Anson's voyages also contributed to naval reforms and improvements in navigation, solidifying his legacy as both an explorer and a naval strategist.",
      famousQuote:
        'I have always been of the opinion that we should never despair.',
    },
    isActive: false,
  },
  {
    score:'0',
    id: 7,
    quizName: 'British Naval History',
    questions: [
      {
        question: 'When did the British Navy become the Royal Navy?',
        options: ['1485', '1660', '1707'],
        correctAnswer: '1660',
      },
      {
        question: 'Which war marked the beginning of British naval supremacy?',
        options: [
          'War of the Spanish Succession',
          'Anglo-Dutch Wars',
          'Napoleonic Wars',
        ],
        correctAnswer: 'Anglo-Dutch Wars',
      },
      {
        question:
          'What was the primary purpose of the Royal Navy in the 18th century?',
        options: ['Defense', 'Exploration', 'Trade'],
        correctAnswer: 'Defense',
      },
      {
        question:
          'Which conflict solidified British naval dominance over France?',
        options: ['Napoleonic Wars', 'World War I', 'War of 1812'],
        correctAnswer: 'Napoleonic Wars',
      },
      {
        question: 'Who was the first commander of the Royal Navy?',
        options: ['Lord Howard', 'Henry VIII', 'Sir Francis Drake'],
        correctAnswer: 'Henry VIII',
      },
      {
        question:
          "When was the Royal Navy's first significant naval engagement?",
        options: ['1545', '1588', '1600'],
        correctAnswer: '1588',
      },
      {
        question: 'What event marked the decline of the Spanish Armada?',
        options: [
          'The Battle of Trafalgar',
          'The defeat of the Spanish Armada',
          'The War of the Roses',
        ],
        correctAnswer: 'The defeat of the Spanish Armada',
      },
      {
        question: 'Which battle in 1794 was significant for the Royal Navy?',
        options: [
          'Battle of the Nile',
          'Battle of Trafalgar',
          'Battle of Cape St. Vincent',
        ],
        correctAnswer: 'Battle of Cape St. Vincent',
      },
      {
        question:
          'What was the primary naval strategy during the Napoleonic Wars?',
        options: ['Blockade', 'Surprise attacks', 'Open engagement'],
        correctAnswer: 'Blockade',
      },
      {
        question:
          'When was the first female admiral appointed in the Royal Navy?',
        options: ['1990', '2007', '2015'],
        correctAnswer: '2007',
      },
    ],
    admiralInfo: {
      image: require('../assets/image/admiral/napier.png'),
      name: 'Charles Napier',
      description:
        "Admiral Charles Napier, born in 1786, gained fame for his daring exploits during the Napoleonic Wars. His command of naval forces in the Mediterranean, particularly his role in the Battle of Cape St. Vincent, highlighted his boldness and tactical skill. Napier was also involved in Portugal's Liberal Wars and played a role in modernizing the Portuguese Navy. Known for his unorthodox methods and tenacity, Napier's career spanned many conflicts, making him one of Britain's most versatile and effective naval commanders.",
      famousQuote:
        'Victory is not always to the strong but to the vigilant, the active, and the brave.',
    },
    isActive: false,
  },
  {
    score:'0',
    id: 8,
    quizName: 'British Naval Warfare',
    questions: [
      {
        question: 'What type of warfare involves naval blockades?',
        options: [
          'Asymmetric warfare',
          'Blockade warfare',
          'Guerrilla warfare',
        ],
        correctAnswer: 'Blockade warfare',
      },
      {
        question: 'What is "naval artillery"?',
        options: [
          'Weapons used in air combat',
          'Cannons and guns used on ships',
          'Submarine weaponry',
        ],
        correctAnswer: 'Cannons and guns used on ships',
      },
      {
        question: 'What does "submarine warfare" involve?',
        options: ['Underwater combat', 'Air defense', 'Naval reconnaissance'],
        correctAnswer: 'Underwater combat',
      },
      {
        question: 'What is the primary advantage of aircraft carriers?',
        options: ['Heavy firepower', 'Air superiority', 'Speed'],
        correctAnswer: 'Air superiority',
      },
      {
        question:
          'What type of naval operation focuses on amphibious landings?',
        options: ['Strategic bombing', 'Amphibious warfare', 'Naval blockade'],
        correctAnswer: 'Amphibious warfare',
      },
      {
        question: 'What is the main purpose of naval mines?',
        options: [
          'To create barriers',
          'To destroy enemy ships',
          'To gather intelligence',
        ],
        correctAnswer: 'To destroy enemy ships',
      },
      {
        question: 'What is "dreadnought" in naval terms?',
        options: [
          'A type of cargo ship',
          'A class of battleship',
          'A type of frigate',
        ],
        correctAnswer: 'A class of battleship',
      },
      {
        question: 'What is the significance of naval logistics?',
        options: [
          'Supply and support operations',
          'Communication',
          'Offensive strategies',
        ],
        correctAnswer: 'Supply and support operations',
      },
      {
        question: 'What is "combined operations" in naval warfare?',
        options: [
          'Cooperation with allies',
          'Using multiple ships',
          'Joint air and naval strikes',
        ],
        correctAnswer: 'Cooperation with allies',
      },
      {
        question: 'What does "naval engagement" mean?',
        options: ['A battle at sea', 'A naval exercise', 'A peace treaty'],
        correctAnswer: 'A battle at sea',
      },
    ],
    admiralInfo: {
      image: require('../assets/image/admiral/gambier.png'),
      name: 'James Gambier',
      description:
        "Born in 1756, Admiral James Gambier is remembered for his service during the Napoleonic Wars. He played a crucial role in the British bombardment of Copenhagen in 1807, which prevented the Danish fleet from falling into French hands. Although often criticized for being overly cautious, Gambier's leadership was instrumental in several important victories. His commitment to the Royal Navy and his ability to command respect from his peers ensured his place in naval history.",
      famousQuote:
        'Success cannot be obtained by chance, it must be achieved through valiant efforts.',
    },
    isActive: false,
  },
  {
    score:'0',
    id: 9,
    quizName: 'British Naval Culture',
    questions: [
      {
        question: "What is the term for a naval officer's uniform?",
        options: ['Rig', 'Attire', 'Garb'],
        correctAnswer: 'Rig',
      },
      {
        question: 'What is the tradition of "piping aboard" in the Navy?',
        options: [
          'Welcoming visitors',
          'Dismissal of sailors',
          'Calling for action',
        ],
        correctAnswer: 'Welcoming visitors',
      },
      {
        question: 'Which is a popular drink among sailors?',
        options: ['Rum', 'Vodka', 'Gin'],
        correctAnswer: 'Rum',
      },
      {
        question: 'What does "crossing the line" refer to in naval tradition?',
        options: [
          'Passing the equator',
          'Entering foreign waters',
          'A ceremonial event',
        ],
        correctAnswer: 'Passing the equator',
      },
      {
        question: "What is the Royal Navy's mascot?",
        options: ['A lion', 'A bulldog', 'A falcon'],
        correctAnswer: 'A bulldog',
      },
      {
        question: "What is the name of the Royal Navy's ceremonial ship?",
        options: ['HMS Victory', 'HMS Queen Mary', 'HMS Beagle'],
        correctAnswer: 'HMS Victory',
      },
      {
        question: 'What does "sailor\'s knot" refer to?',
        options: ['A type of tie', 'A knot used in sailing', 'A hairstyle'],
        correctAnswer: 'A knot used in sailing',
      },
      {
        question: 'Which song is traditionally sung by sailors?',
        options: [
          'Rule Britannia',
          'The Drunken Sailor',
          'Land of Hope and Glory',
        ],
        correctAnswer: 'The Drunken Sailor',
      },
      {
        question: 'What is a "mess" in naval terms?',
        options: ['A place to eat', 'A barracks', 'A supply depot'],
        correctAnswer: 'A place to eat',
      },
      {
        question: 'What does "naval heritage" encompass?',
        options: [
          'Tradition and history',
          'Modern practices',
          'Economic contributions',
        ],
        correctAnswer: 'Tradition and history',
      },
    ],
    admiralInfo: {
      image: require('../assets/image/admiral/howe.png'),
      name: 'Richard Howe',
      description:
        'Admiral Richard Howe, born in 1726, made a significant impact during the American War of Independence. As the commander of British naval forces, Howe\'s leadership during the Battle of Ushant in 1778 and his diplomatic efforts with the American colonies were key aspects of his career. Known as "Black Dick," Howe was admired for his calm demeanor and strategic brilliance. His victory in the Glorious First of June battle in 1794 against the French Revolutionary fleet marked a high point in his career, securing his legacy as one of Britain\'s great naval heroes.',
      famousQuote:
        "A sailor's life is the most uncertain, but also the most rewarding.",
    },
    isActive: false,
  },
  {
    score:'0',
    id: 10,
    quizName: 'Naval Technology',
    questions: [
      {
        question: 'What is a "destroyer" in naval terms?',
        options: [
          'A small, fast warship',
          'A type of submarine',
          'An aircraft carrier',
        ],
        correctAnswer: 'A small, fast warship',
      },
      {
        question: 'What is the primary purpose of naval radar?',
        options: ['Navigation', 'Detection and tracking', 'Communication'],
        correctAnswer: 'Detection and tracking',
      },
      {
        question:
          'What technology is used in modern naval warfare for targeting?',
        options: ['GPS', 'Sonar', 'Morse code'],
        correctAnswer: 'GPS',
      },
      {
        question: 'What does "Aegis" refer to in naval systems?',
        options: [
          'A type of ship',
          'An advanced radar system',
          'A naval doctrine',
        ],
        correctAnswer: 'An advanced radar system',
      },
      {
        question: 'What is a "nuclear submarine"?',
        options: [
          'A submarine powered by nuclear energy',
          'A conventional submarine',
          'A surface vessel',
        ],
        correctAnswer: 'A submarine powered by nuclear energy',
      },
      {
        question:
          'What technology allows submarines to communicate underwater?',
        options: ['Sonar', 'Radar', 'Laser'],
        correctAnswer: 'Sonar',
      },
      {
        question: 'What is the function of a naval aircraft carrier?',
        options: [
          'To transport troops',
          'To launch and recover aircraft',
          'To patrol coastal waters',
        ],
        correctAnswer: 'To launch and recover aircraft',
      },
      {
        question: 'What does "stealth technology" refer to in naval terms?',
        options: ['Weapons', 'Reducing visibility to radar', 'Speed'],
        correctAnswer: 'Reducing visibility to radar',
      },
      {
        question: 'What is a "torpedo"?',
        options: ['A type of missile', 'An underwater weapon', 'A naval ship'],
        correctAnswer: 'An underwater weapon',
      },
      {
        question: 'What is "unmanned naval vehicle"?',
        options: [
          'A vessel operated without crew',
          'A cargo ship',
          'A rescue boat',
        ],
        correctAnswer: 'A vessel operated without crew',
      },
    ],
    admiralInfo: {
      image: require('../assets/image/admiral/hood.png'),
      name: 'Samuel Hood',
      description:
        "Born in 1724, Admiral Samuel Hood was a highly respected naval officer who played a significant role in several key battles during the American Revolutionary War. Hood's leadership during the Battle of the Chesapeake and the Battle of Saint Kitts showcased his tactical acumen. He later served as a mentor to younger officers, including Horatio Nelson. Hood's long and distinguished career left a lasting impact on the Royal Navy, and his contributions during the wars with France and the American colonies earned him a place among Britain's most esteemed admirals.",
      famousQuote: 'He who commands the sea commands everything.',
    },
    isActive: false,
  },
];
