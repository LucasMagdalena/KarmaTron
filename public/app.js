let advData;
let eraData;
let biomeData;
let currentData;
let gameState;

var era;
var biome;
var kName;
var kFief;
var kTitle;
var romance;
var nemesis;
var saga;
var episode;

let year;
let kLvl;
let kGold;
let kPeons;
let kHP;
let kScore;

let episodeCount=0;

let bestMaleVoice = null;
let isGameOver = false;

//	Global queue and flag to indicate if an utterance is currently in progress.
const phraseQueue = [];
let isSpeaking = false;
let isPaused = false;
let isMuted = false;

const actions = [
	{
	name: "Coup de main",	  
	report: `Il appela des amis pour l'aider à s'en sortir et se réunit avec eux à ''inn'' pour leur payer °n.drink°. `,
	healthChange: 0,
	goldChange: 0,
	peonChange: +2,
	condition: () => kGold < 5 && kPeons <3,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/click.wav",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "transparent",
	bgGradient : "linear-gradient(to bottom, ivory, bisque)",
	fontColor: "black"
	},
	{
	name: "Aumône",	  
	report: `Il mendia devant ''inn'' pour trouver une piécette. `,
	healthChange: 0,
	goldChange: +2,
	peonChange: -1,
	condition: () => kGold < 2,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/EI_Coin_USE_multiple_fast_01.ogg",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "transparent",
	bgGradient : "linear-gradient(to bottom, ivory, bisque)",
	fontColor: "black"
	},
	{
	name: "Soudards",	  
	report: `Il recruta de l'aide à ''inn''. Il engagea des ''trades'' qui avaient l'air assez °adj.mbad°. `,
	healthChange: 0,
	goldChange: -3,
	peonChange: +5,
	condition: () => kGold > 3 && kPeons <20,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/Oriental.wav",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "darkblue",
	bgGradient : "linear-gradient(to bottom, darkblue, navy)",
	fontColor: "bisque"
	},
	{
	name: "Compagnie",	  
	report: `Il engagea une compagnie de soudards de ''clan'' dans #loc#. `,
	healthChange: 0,
	goldChange: -7,
	peonChange: +10,
	condition: () => kGold > 7 && kPeons <50,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/Oriental.wav",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "navy",
	bgGradient : "linear-gradient(to bottom, darkblue, navy)",
	fontColor: "bisque"
	},
	{
	name: "Régiment",	  
	report: `Il engagea un régiment de soudards de ''clan'' à #loc#, avec un garde du corps nommé ''mname'' ''nick''. `,
	healthChange: +2,
	goldChange: - 12,
	peonChange: +15,
	condition: () => kGold > 10 && kPeons<80 &&kGold<100,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/Oriental.wav",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "silver",
	bgGradient : "linear-gradient(to bottom, darkblue, navy)",
	fontColor: "bisque"
	},
	{
	name: "Armée",	  
	report: `Il recruta une armée des ''clan'' à #loc#, avec une suite pour le protéger. Son lieutenant ''mnames'' lui fit °n.report° au sujet de °n.foes° qui campaient près de °n.river°. `,
	healthChange: +5,
	goldChange: -25,
	peonChange: +35,
	condition: () => kGold > 50,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/Oriental.wav",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "goldenrod",
	bgGradient : "linear-gradient(to bottom, darkblue, navy)",
	fontColor: "red"
	},
	{
	name: "Lever les masses",	  
	report: `Il alla chercher tous les soudards de France à #loc#. `,
	healthChange: 0,
	goldChange: - 70,
	peonChange: + 100,
	condition: () => kGold > 100,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/Oriental.wav",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "gold",
	bgGradient : "linear-gradient(to bottom, purple, navy)",
	fontColor: "red"
	},	
	{
	name: "Lutte",
	report: `Il lutta contre ''mname'' ''nick'' lors d'un °adj.mgood° combat. `,
	healthChange: 	-1,
	goldChange:		+1,
	peonChange: 	+1,
	condition: () => kHP >= 1 && kGold <10,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/Mouth Interface (8).wav",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "ivory",
	bgGradient : "linear-gradient(to bottom, ivory, lightyellow)",
	fontColor: "black"
	},
	{
	name: "Duel",
	report: `Il °vb.kill° un prisonnier ennemi lors d'un °adj.mgood° combat. `,
	healthChange: 	-2,
	goldChange:		+1,
	peonChange: 	+3,
	condition: () => kHP >= 4 && kGold <20,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/EI_Sword_TAP_01.ogg",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "ivory",
	bgGradient : "linear-gradient(to bottom, ivory, lightyellow)",
	fontColor: "black"
	},
	{
	name: "Action d'éclat",
	report: `Il se distingua par une manœuvre °adj.fgood° lors de combats. Il en fut grassement récompensé. `,
	healthChange: 	-5,
	goldChange:		+5,
	peonChange: 	+2,
	condition: () => kHP >= 10 && kGold <50,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/EI_VO_Crowd_cheer_06.ogg",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "ivory",
	bgGradient : "linear-gradient(to bottom, ivory, lightyellow)",
	fontColor: "black"
	},
	{
	name: "Exploit",
	report: `Seul, notre héros vainquit ''clan'', °vb.kill° ''mname'' ''nick'' et démoralisa son armée, s'attirant de nombeaux serviteurs. `,
	healthChange: 	- 10,
	goldChange:		+5,
	peonChange: 	+ 15,
	condition: () => kHP >= 20 && kPeons <20,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/EI_VO_Crowd_cheer_06.ogg",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "goldenrod",
	bgGradient : "linear-gradient(to bottom, ivory, lightyellow)",
	fontColor: "black"
	},
	{
	name: "Sacrifice",
	report: `Seul, notre héros vainquit ''clan'', °vb.kill° ''mname'' ''nick'' et démoralisa son armée, s'attirant de nombeaux serviteurs. `,
	healthChange: 	- 50,
	goldChange:		0,
	peonChange: 	+ 80,
	condition: () => kHP >= 50 && kPeons <70,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/click.wav",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "crimson",
	bgGradient : "linear-gradient(to bottom, ivory, lightyellow)",
	fontColor: "crimson"
	},
	{
	name: "Rapine",
	report: `Il alla voler les gens de #loc# avec ''thugs''. `,	  
	healthChange: 	- 1,
	goldChange: 	+ 4,
	peonChange: 	- 2,
	condition: () => kPeons >= 2 && kPeons <20 && kGold <10,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/EI_VO_Crowd_battle_training_01.ogg",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "brown",
	bgGradient : "linear-gradient(to bottom, brown, darkred)",
	fontColor: "white"
	},
	{
	name: "Accrochage",
	report: `Aidé de sa suite fournie par ''clan'', il °vb.kill° ''mname'' ''nick'' et ses séides lors d'une escarmouche. `,
	healthChange: 	-3,
	goldChange:		+10,
	peonChange: 	-5,
	condition: () => kPeons >= 10 && kPeons <40,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/EI_VO_Crowd_battle_training_01.ogg",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "crimson",
	bgGradient : "linear-gradient(to bottom, brown, darkred)",
	fontColor: "white"
	},
	{
	name: "Bataille",
	report: `Avec son armée °adj.fbad°, notre héros vainquit ''clan''. Il °vb.kill° ''mname'' ''nick'' et son armée lors d'une bataille. `,
	healthChange: 	- 6,
	goldChange:		+ 20,
	peonChange: 	- 12,
	condition: () => kPeons >= 30 && kHP>10 &&kGold <50,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/EI_VO_Crowd_battle_training_01.ogg",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "goldenrod",
	bgGradient : "linear-gradient(to bottom, brown, darkred)",
	fontColor: "goldenrod"
	},
	{
	name: "Guerre",
	report: `Avec son armée de ''thugs'' °adj.pbad°, notre héros vainquit ''clan'' °adv.fast°, et il °vb.kill° ''mname'' ''nick'' de ''clan'' et son armée °adj.fbad° lors de plusieurs batailles. Dans #loc#, on en voit encore les traces. `,
	healthChange: 	- 3,
	goldChange:		+ 50,
	peonChange: 	- 20,
	condition: () => kPeons >= 40,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/EI_VO_Crowd_battle_training_05.ogg",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "gold",
	bgGradient : "linear-gradient(to bottom, crimson, darkred)",
	fontColor: "gold"
	},
	{
	name: "Annihilation",
	report: `#narr#, notre héros vainquit ''clan'' °adv.fast° avec son armée de °adj.pbad° ''thugs'', puis °vb.kill° ''mname'' ''nick'' et son escorte °adj.fbad° lors de plusieurs bataille. À #loc#, on en voit encore les traces. `,
	healthChange: 	- 40,
	goldChange:		+ 200,
	peonChange: 	- 100,
	condition: () => kPeons >= 200 && kHP>60,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/click.wav",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "gold",
	bgGradient : "linear-gradient(to bottom, crimson, darkred)",
	fontColor: "gold"
	},

	{
	name: "Entraînement",
	report: `Il s'entraîna au maniement de ''weapons'' avec ''mname'' ''nick'' lors d'un duel °adj.mgood°. `,
	healthChange: 	+2,
	goldChange:		-1,
	peonChange: 	-1,
	condition: () => kHP > 5 && kPeons > 10 && kGold <25,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/EI_Sword_TAP_01.ogg",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "darkpink",
	bgGradient : "linear-gradient(to bottom, darkpink, purple)",
	fontColor: "bisque"
	},
	{
	name: "Formation avancée",
	report: `#narr#, il s'entraîna au maniement de ''weapons'' avec ''mname'' ''nick'' pour de °adj.pgood° moments d'escrime. `,
	healthChange: 	+ 5,
	goldChange:		- 5,
	peonChange: 	-2,
	condition: () => kHP > 10 && kPeons > 20 && kGold <50,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/EI_Sharp_Object_PICKUP_03.ogg",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "darkpink",
	bgGradient : "linear-gradient(to bottom, darkpink, purple)",
	fontColor: "bisque"
	},
	{
	name: "Organiser des manœuvres",
	report: `#narr#, il mena son armée à l'exercice. `,
	healthChange: 	+10,
	goldChange:		-15,
	peonChange: 	+10,
	condition: () => kHP > 15 && kPeons >20,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/EI_Sword_TAP_01.ogg",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "darkpink",
	bgGradient : "linear-gradient(to bottom, darkpink, purple)",
	fontColor: "bisque"
	},
	{
	name: "Cambriole",
	report: `Il envoya ses gens voler des biens. Peu revinrent de l'expédition. `,	  
	healthChange: 	0,
	goldChange: 	+ 4,
	peonChange: 	- 5,
	condition: () => kPeons >= 5 && kGold < 10,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/Item Lock (1).wav",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "darkorange",
	bgGradient : "linear-gradient(to bottom, blue, darkblue)",
	fontColor: "black"
	},
	{
	name: "Saccage",
	report: `Il envoya ses gens dépouiller un village. `,	  
	healthChange: 	0,
	goldChange: 	+ 8,
	peonChange: 	- 10,
	condition: () => kPeons >= 10 && kGold < 20,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/Item Lock (1).wav",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "darkorange",
	bgGradient : "linear-gradient(to bottom, blue, darkblue)",
	fontColor: "black"
	},
	{
	name: "Lever la dîme",
	report: `Son armée se chargea de collecter la dîme. Des péons mécontents s'en prirent à ses °adj.pgood° serviteurs. `,	  
	healthChange: 	0,
	goldChange: 	+ 20,
	peonChange: 	- 25,
	condition: () => kPeons >= 50 && kGold < 100,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/click.wav",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "darkorange",
	bgGradient : "linear-gradient(to bottom, blue, darkblue)",
	fontColor: "black"
	},
	{
	name: "Pillage",
	report: `Il dépouilla les °adj.pbad° gens de ''fief'' avec son immense armée. Les lamentations s'élevèrent tandis que notre protagoniste °vb.speak° sa jubilation ! `,	  
	healthChange: 	0,
	goldChange: 	+ 40,
	peonChange: 	- 50,
	condition: () => kPeons >= 100 && kGold>50,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/click.wav",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "darkorange",
	bgGradient : "linear-gradient(to bottom, blue, darkblue)",
	fontColor: "black"
	},
	{
	name: "Se reposer",	  
	report: `#narr#, quand il choisit un endroit propice au repos. °time.start°, il se remit en route. `,
	healthChange: 	+3,
	goldChange: 	-1,
	peonChange: 	-1,
	condition: () => kHP <5,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/Crunch Bite Item (5).wav",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "green",
	bgGradient : "linear-gradient(to bottom, green, white)",
	fontColor: "white"
	},
	{
	name: "Soins légers",	  
	report: `Il °vb.healed° de ses maux par ''mname''. `,
	healthChange: 	+ 5,
	goldChange: 	- 3,
	peonChange: 	0,
	condition: () => kHP<10 && kHP <20 && kGold >3,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/Potion Drink (2).wav",
	soundClick: "sounds/click.wav",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "green",
	bgGradient : "linear-gradient(to bottom, darkgreen, green)",
	fontColor: "bisque"
	},
	{
	name: "Soins d'urgence",	  
	report: `Il °vb.healed° °adv.fast° grâce à ''mname'' ''nick'', qui lui donna ''cure''. `,
	healthChange: 	+ 5,
	goldChange: 	- 1,
	peonChange: 	-0,
	condition: () => kHP <3,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/Potion Drink (2).wav",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "red",
	bgGradient : "linear-gradient(to bottom, darkgreen, green)",
	fontColor: "bisque"
	},
	{
	name: "Soins intensifs",	  
	report: `Il °vb.healed° °adv.fast° grâce à ''mname'' ''nick'', qui lui donna ''cure'' et lui dit de se méfier de ''craze''. `,
	healthChange: 	+ 10,
	goldChange: 	- 5,
	peonChange: 	- 2,
	condition: () => kHP <6 && kGold >5,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/Potion Drink (2).wav",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "crimson",
	bgGradient : "linear-gradient(to bottom, darkgreen, green)",
	fontColor: "bisque"
	},
	{
	name: "Magie curative",	  
	report: `Il °vb.healed° par les procédés alchimiques de ''mname'' ''nick''. Certains de ses suivants se détournèrent de lui. `,
	healthChange: 	+ 20,
	goldChange: 	- 10,
	peonChange: 	- 20,
	condition: () => kGold > 50 && kPeons > 20 && kHP >5,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/EI_Potion_USE_bubbling_poof_epic_04.ogg",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "lightblue",
	bgGradient : "linear-gradient(to bottom, darkgreen, green)",
	fontColor: "bisque"
	},
	{
	name: "Sacrifice aux entités",	  
	report: `Il °vb.healed° °adv.fast° par les procédés alchimiques de ''mname'' ''nick''. Certains de ses suivants se détournèrent de lui. `,
	healthChange: 	+ 50,
	goldChange: 	- 100,
	peonChange: 	- 100,
	condition: () => kGold > 200 && kPeons >200 && kHP>50,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/EI_EVENT_game_over_05.ogg",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "darkgreen",
	bgGradient : "linear-gradient(to bottom, black, purple)",
	fontColor: "bisque"
	},
	{
	name: "Complot",	  
	report: `Il chercha à renverser le ''title'' de ''fief'' à #loc#, et à prendre ses titres et ses gens. Ce fut un succès. `,
	healthChange: 0,
	goldChange: - 20,
	peonChange: + 25,
	condition: () => kGold > 30 && kPeons > 50,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/EI_Door_SWING_creak_long_04.ogg",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "purple",
	bgGradient : "linear-gradient(to bottom, purple, black)",
	fontColor: "bisque"
	},
	{
	name: "Dépression",	  
	report: `Il vécut une °adj.fbad° passe. Il °vb.like° ''mname''. `,
	healthChange: - 1,
	goldChange: 0,
	peonChange: + 2,
	condition: () => kPeons <3 && kGold <5,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/EI_Door_SWING_creak_long_04.ogg",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "purple",
	bgGradient : "linear-gradient(to bottom, purple, black)",
	fontColor: "bisque"
	},
	{
	name: "Chantage",	  
	report: `Il était ruiné et perdait des amis parmi ''clan''. Il parvint à mendier une obole en feignant de mettre fin à ses jours. `,
	healthChange: -10,
	goldChange: +20,
	peonChange: -5,
	condition: () => kGold <5 && kPeons >20,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/EI_Door_SWING_creak_long_04.ogg",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "purple",
	bgGradient : "linear-gradient(to bottom, purple, black)",
	fontColor: "bisque"
	},
	{
	name: "Assassinat",	  
	report: `Il fut victime d'un assassinat par ''mname'' ''nick'' de ''clan''. Il tenta d'en profiter pour recruter des adeptes. `,
	healthChange: -20,
	goldChange: 0,
	peonChange: +35,
	condition: () => kGold >100 && kHP>20,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/click.wav",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "purple",
	bgGradient : "linear-gradient(to bottom, purple, black)",
	fontColor: "bisque"
	},
	{
	name: "Ériger un monument",	  
	report: `Il °vb.build° un monument qui fut très apprécié dans la cité. `,
	healthChange: 0,
	goldChange: -40,
	peonChange: +50,
	condition: () => kGold >100 && kPeons>100,
	animationAppear: "fade-in",
	animationClick: "click-effect",
	animationDisappear: "fade-out",
	soundAppear: "sounds/appearance.wav",
	soundClick: "sounds/click.wav",
	soundDisappear: "sounds/disappear.wav",
	borderColor : "goldenrod",
	bgGradient : "linear-gradient(to bottom, ivory, bisque)",
	fontColor: "darkpurple"
	}
];

const eraBackgrounds = {
	neolithique: "/images/background/neolithic.png",
	celtique: "/images/background/gold.png",
	gallo_romaine: "/images/background/silver.png",
	franque: "/images/background/bronze.png",
	medievale: "/images/background/iron.png",
	moderne: "/images/background/lead.webp",
	revolutionnaire: "/images/background/void.webp",
	contemporaine: "/images/background/lead.webp",
	future: "/images/background/void.webp"
};

const eraKings = {
	neolithique: "/images/kings/neolithic.png",
	celtique: "/images/kings/gold.png",
	gallo_romaine: "/images/kings/silver.png",
	franque: "/images/kings/bronze.png",
	medievale: "/images/kings/iron.png",
	moderne: "/images/kings/lead.png",
	revolutionnaire: "/images/kings/void.png",
	contemporaine: "/images/kings/lead.png",
	future: "/images/kings/void.png"
};

////////////// UTILS
function playSound(url) {
	if (url) {
	const audio = new Audio(url);
	audio.play().catch(err => console.error("Erreur lecture audio:", err));
	}
}

function rollRandomYear(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateEra(year) {	
	if (year < -2200) return "neolithique";
	if (year < - 200) return "celtique";
	if (year < 453) return "gallo_romaine";
	if (year < 1053) return "franque";
	if (year < 1492) return "medievale";
	if (year < 1760) return "moderne";
	if (year < 1840) return "revolutionnaire";
	if (year < 2035) return "contemporaine";
	return "future";
}

function rFA(array) {
    if (!Array.isArray(array) || array.length === 0) {
        console.error("Invalid array passed to rFA");
        return null;
    }
    const random = Math.floor(Math.random() * array.length);
    return array[random];
}

function fetchFromObject(obj, prop) {
    const _index = prop.indexOf('.');
    if (_index > -1) {
        const newObj = obj[prop.substring(0, _index)];
        return fetchFromObject(newObj, prop.substr(_index + 1));
    }
    return obj[prop];
}

function advReplaceTxt(text) {
	const regex = /°(.+?)°/g;
	return text.replace(regex, (match, $1) => {
    	return rFA(fetchFromObject(advData, $1));
    });
}

function biomeReplaceTxt(text) {	
	const biomeRegex = /#(.+?)#/g;
	return text.replace(biomeRegex, (match, $1) => {
    	return rFA(fetchFromObject(biomeData, $1));
    });
}

function eraReplaceTxt(text) {	
	const eraRegex = /''(.+?)''/g;
	return text.replace(eraRegex, (match, $1) => {
    	return rFA(fetchFromObject(eraData, $1));
    });
}

function elideTxt (text) {
	return text
    .replace(/\bà le\b/g, "au")
    .replace(/\bà les\b/g, "aux")
    .replace(/\bde le\b/g, "du")
    .replace(/\bde les\b/g, "des")
	.replace(/\bde un\b/g, "d’un")
	.replace(/\bde une\b/g, "d’une")
}

function populateTxt(text) {
	text = advReplaceTxt(text);
	text = biomeReplaceTxt(text);
	text = eraReplaceTxt(text);
	text = advReplaceTxt(text);
	text = elideTxt(text);
	return text;
}

function exportSaga () {
	const htmlContent = `
	<!DOCTYPE html>
	<html lang="fr">
	<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=980px, initial-scale=1.0">
	<link href='https://fonts.googleapis.com/css?family=MedievalSharp' rel='stylesheet'>
	<link href='https://fonts.googleapis.com/css?family=Aclonica' rel='stylesheet'>

	<title>Saga de ${kName}</title>
	<style>
		body {
		width:980px;
		display:flexbox;
		justify-content: start;
		font-family: "MedievalSharp", fantasy;
		color:rgb(32, 16, 0);font-size:16px;
		background-image: radial-gradient(rgba(255, 249, 238, 0.973),rgba(248, 207, 104, 0.815));
		background-repeat: no-repeat;
		background-size:992px;
		border:6px brown outset;
		line-height:1.6;
		margin:0px;
		margin-left:15 px;			
		}
		header {
		background-image: linear-gradient(to bottom, rgba(14, 0, 7, 0.911),rgba(63, 4, 35, 0.808));
		color:#f7f7e9;
		margin:8px;
		text-align: center;justify-items:center;
		border:4px rgba(218, 165, 32, 0.903); border-style:ridge;border-radius:30px 30px 30px 30px;
		width=90%;
		}
		header h1 {
		font-size: 32px;color:#FFFFDD; text-shadow:2px 3px 2px #331d00f5;font-variant: small-caps;
		text-align: center;
		}
		h2 {
		margin-left:30px;
		text-align:center;color:black;border:6px rgba(218, 165, 32, 0.903); border-style:ridge;border-radius:30px 30px 30px 30px;
		padding:6px;width:60%;
		background-image: radial-gradient(rgba(255, 249, 238, 0.973),rgba(249, 235, 200, 0.95));
		}
		h3 {
		margin-left:30px;
		text-align:center;
		padding:6px;
		} 
		p {
		font-weight:500;
		text-indent: 30px;
		text-align: justify;
		margin-left:30px;
		padding:10px; padding-bottom:0px; padding-top:0px;
		}
		#text-container {
		height: 1000px;
		overflow-y: auto;
		overflow-x: hidden; 
		position: relative;
		scroll-behavior: smooth;
		}
		#text-container::-webkit-scrollbar {
		width: 12px;
		}
		#text-container::-webkit-scrollbar-thumb {
			background: #8B4513;
			border-radius: 6px;
			border: 2px solid #b88a60; 
		}
		#text-container::-webkit-scrollbar-track {
			background: #e0c080; 
			border-radius: 6px;
		}
		#content {
		box-sizing: border-box;
		line-height: 1.6;
		width : 90%;
		}
	</style>
	<script>
	const textContainer = document.getElementById("text-container");
	window.addEventListener("load", () => {
		textContainer.scrollTop = textContainer.scrollHeight; 
	});
	</script>
	</head>
		<body>
			<header>
				<h1>Geste du Grand Roi ${kName}</h1>
				<h2>${kScore} points de Réputation</h2>
			</header>
			<div id="textContainer">			
				<div id="content">${saga}</div>
			</div>				
		</body>
	</html>
	`;
	const newWindow = window.open("", "_blank");

		// Write the content to the new window
	newWindow.document.open();
	newWindow.document.write(htmlContent);
	newWindow.document.close();
}
////////////// DISPLAY
function getKingImage(era) {
	return eraKings[era];
}

function getBackgroundImage(era) {
	return eraBackgrounds[era];
}

function emojiDisplay(id, emoji1, emoji5, emoji10, emoji20, emoji50, count) {
    let container = document.getElementById(id);
    container.innerHTML = ` [ ${count} ] `;

    let fifties = Math.floor(count / 50);
    count %= 50;

    let twenties = Math.floor(count / 20);
    count %= 20;

    let tens = Math.floor(count / 10);
    count %= 10;

    let fives = Math.floor(count / 5);
    count %= 5;

    let ones = count;

    for (let i = 0; i < fifties; i++) {
        container.innerHTML += emoji50 + " ";
    }
    for (let i = 0; i < twenties; i++) {
        container.innerHTML += emoji20 + " ";
    }
    for (let i = 0; i < tens; i++) {
        container.innerHTML += emoji10 + " ";
    }
    for (let i = 0; i < fives; i++) {
        container.innerHTML += emoji5 + " ";
    }
    for (let i = 0; i < ones; i++) {
        container.innerHTML += emoji1;
    }
}

function fullEmojiDisplay() {
    emojiDisplay("Peons", "👤", "🥷", "🧛🏼", "🧙🏻‍♂️", "🤴🏻", Math.round(kPeons));
    emojiDisplay("HP", "❤️", "💖", "❣️", "💗", "💞", Math.round(kHP));
    emojiDisplay("Gold", "🪙", "💰", "💎", "👑", "⚜️", Math.round(kGold));
}

function adjustFontColor(score) {
	const element = document.getElementById("dynamicText");	
	if (score >= 50000) {
		element.style.color = "gold"; // Medium score
	} else if (score >= 25000) {
		element.style.color = "goldenrod"; // Medium score
	} else if (score >= 10000) {
		element.style.color = "brown"; // Medium score
	} else if (score >= 5000) {
		element.style.color = "green"; // S score
	} else if (score >= 2000) {
		element.style.color = "orange"; // High score
	} else if (score >= 1000) {
		element.style.color = "yellow"; // Medium score
	} else {
		element.style.color = "black"; // Low score
	}
}

function updateScore () {
	kScore = Math.round(kHP * 100 + kGold * 50 + kPeons * 25 + kLvl * 10 + saga.length + kTitle.length);
	document.getElementById("score").textContent = kScore;
	adjustFontColor(kScore);
}

function adjustBackgroundByEra(era) {
	const element = document.getElementById("dynamicBackground");
	const element2 = document.getElementById("dynamicBackground2");
	const element3 = document.getElementById("dynamicBackground3");
	switch (era) {
		case "neolithique":
			element.style.background = "linear-gradient(to right, gray, lightgray)";
			element2.style.background = "linear-gradient(to right, gray, lightgray)";
			element3.style.background = "linear-gradient(to top, gray, lightgray)";
			break;
		case "celtique":
			element.style.background = "linear-gradient(to right, goldenrod, gold)";
			element2.style.background = "linear-gradient(to right, goldenrod, gold)";
			element3.style.background = "linear-gradient(to top, goldenrod, gold)";
			break;
		case "gallo_romaine":
			element.style.background = "linear-gradient(to right, ivory, whitesmoke)";
			element2.style.background = "linear-gradient(to right, ivory, whitesmoke)";
			element3.style.background = "linear-gradient(to top, ivory, whitesmoke)";
			break;
		case "franque":
			element.style.background = "linear-gradient(to right, blue, goldenrod)";
			element2.style.background = "linear-gradient(to right, blue, goldenrod)";
			element3.style.background = "linear-gradient(to top, blue, goldenrod)";
			break;
		case "medievale":
			element.style.background = "linear-gradient(to right, black, darkgray)";
			element2.style.background = "linear-gradient(to right, black, darkgray)";
			element3.style.background = "linear-gradient(to top, black, darkgray)";
			break;
		case "moderne":
			element.style.background = "linear-gradient(to right, darkgray, slategray)";
			element2.style.background = "linear-gradient(to right, darkgray, slategray)";
			element3.style.background = "linear-gradient(to top, darkgray, slategray)";
			break;
		case "revolutionnaire":
			element.style.background = "linear-gradient(to right, crimson, red)";
			element2.style.background = "linear-gradient(to right, crimson, red)";
			element3.style.background = "linear-gradient(to top, crimson, red)";
			break;
		case "contemporaine":
			element.style.background = "linear-gradient(to right, grey, brown)";
			element2.style.background = "linear-gradient(to right, grey, brown)";
			element3.style.background = "linear-gradient(to top, grey, brown)";
			break;
		case "future":
			element.style.background = "linear-gradient(to right, cyan, lightblue)";
			element2.style.background = "linear-gradient(to right, cyan, lightblue)";
			element3.style.background = "linear-gradient(to top, cyan, lightblue)";
			break;
		default:
			element.style.background = "linear-gradient(to right, black, white)";
			element2.style.background = "linear-gradient(to right, black, white)";
			element3.style.background = "linear-gradient(to top, black, white)";
	}
}

function displayVariables () {
	const eraDesc = eraData && eraData["desc"] ? eraData["desc"] : era;

	document.getElementById("era").textContent 		= 	eraDesc;
	document.getElementById("lvl").textContent		= 	kLvl;
	document.getElementById("kName").innerHTML		= 	kName;
	document.getElementById("kName2").innerHTML		= 	kName;
	document.getElementById("kTitle").innerHTML		= 	kTitle;
	document.getElementById("kFief").textContent	= 	kFief;
	document.getElementById("saga").innerHTML		= 	saga;

	//	Scroller for textContainer	 
	const textContainer = document.getElementById("text-container");
	window.addEventListener("load", () => {
		textContainer.scrollTop = textContainer.scrollHeight; 
	});
}

function displayImages() {
	var kingImage = getKingImage(era);
	(document.getElementById("kingImage")).src = kingImage ;
	(document.getElementById("kingImage")).alt = `Roi de l'âge eud'${era}`;
	//	BG img change
	var backgroundImage = getBackgroundImage(era);
	document.body.style.backgroundImage = `url(${backgroundImage})`;
	document.body.style.backgroundSize = "1200px 1000px";
}

function displayAll () {
	displayImages();
	displayVariables();
	fullEmojiDisplay();
	adjustBackgroundByEra(era);
	updateScore();
}

////////////// VOICE SYNTH
async function waitForVoices() {
    return new Promise((resolve) => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
            resolve(voices);
        } else {
            window.speechSynthesis.onvoiceschanged = () => {
                resolve(window.speechSynthesis.getVoices());
            };
        }
    });
}

async function initializeSpeechSynthesis() {
    const voices = await waitForVoices();
		console.log("Voices loaded:", voices);

    bestMaleVoice = voices.find(voice => voice.name.includes("Paul") && voice.lang.toLowerCase().startsWith("fr")) || voices[0];
    updateSpeechControls(); // Update UI after voices are loaded
}

function updateSpeechControls() {
    const pauseResumeText = isPaused ? `▶️ (${phraseQueue.length})` : `⏸️ (${phraseQueue.length})`;
    const muteButtonText = isMuted ? "🔊" : "🔇";
    $("#pauseResumeButton").text(pauseResumeText);
    $("#muteButton").text(muteButtonText);

    // Add a condition to notify the user if the queue is empty
    if (!isSpeaking && phraseQueue.length === 0) {
        console.log("No more phrases in the queue.");
        $("#pauseResumeButton").text("Queue Complete"); // Show a relevant status
    }
}

function togglePauseResume() {
	if (isPaused) {
	  isPaused = false;
	  window.speechSynthesis.resume();
	} else {
	  isPaused = true;
	  window.speechSynthesis.pause();
	}
	updateSpeechControls();
}

function skipCurrentUtterance() {
	if (isSpeaking) {
	  isSpeaking = false;
	  window.speechSynthesis.cancel();	
	}
	processQueue();
}

function toggleMute() {
	isMuted = !isMuted;

	if (isMuted) {
	  window.speechSynthesis.cancel();
	  phraseQueue.length = 0; // Clear the entire queue
	  isSpeaking = false; // Reset speaking state
	  	console.log("Speech muted and queue cleared.");

	  $("#read-btn").hide(); // Hide buttons if speech is muted
	  $("#pauseResumeButton").hide();
	  $("#skipButton").hide();
	  $("#music").hide();
	} else {
	  	console.log("Speech unmuted.");
	  $("#read-btn").show(); // Show buttons otherwise
	  $("#pauseResumeButton").show();
	  $("#skipButton").show();
	  $("#music").show();
	  processQueue();	  
	}
}

function configureUtterance(utterance) {
	if (!bestMaleVoice) {
        console.error("Voice not initialized yet.");
        return;
    }
	utterance.voice = bestMaleVoice;
	utterance.rate = 1.50;
	utterance.pitch = 0.15;
}

async function speakText(text) {
    return new Promise((resolve, reject) => {
        if (isMuted) return resolve(); // Skip if muted

        const utterance = new SpeechSynthesisUtterance(text);
        configureUtterance(utterance);

        utterance.onend = () => {
            console.log(`Finished speaking: "${text}"`);
            resolve();
            if (phraseQueue.length === 0) { // Reset state when queue ends
                isSpeaking = false;
                updateSpeechControls(); // Update UI to reflect playback end
                console.log("Playback ended, queue cleared.");
            }
        };

        utterance.onerror = (event) => {
            console.error("Speech synthesis error:", event.error);
            reject(event.error);
        };

        window.speechSynthesis.speak(utterance);
        updateSpeechControls();
    });
}

async function processQueue() {
    if (isMuted || phraseQueue.length === 0) {
        isSpeaking = false; // Ensure speaking state is reset if queue is empty
        updateSpeechControls(); // Update the UI
        console.log("Queue empty or muted, exiting playback.");
        return;
    }

    isSpeaking = true; // Flag the speaking state
    const nextPhrase = phraseQueue.shift();
    console.log(`Processing phrase: "${nextPhrase}"`);

    try {
        await speakText(nextPhrase); // Await the completion of the utterance
        if (phraseQueue.length > 0) {
            await processQueue(); // Continue processing the next phrase
        } else {
            isSpeaking = false; // Reset speaking state after last phrase
            updateSpeechControls(); // Update the UI
            console.log("All phrases played, resetting state.");
        }
    } catch (err) {
        console.error("Error during speech synthesis:", err);
        isSpeaking = false; // Ensure speaking state is reset on error
        updateSpeechControls(); // Update the UI
    }
}

async function enqueuePhrase(text) {
    phraseQueue.push(text);
    console.log(`Added phrase to queue: "${text}"`);
    console.log(`Current queue length: ${phraseQueue.length}`);

    if (!isSpeaking && !isMuted) { 
        await processQueue(); // Trigger queue processing if idle
    }
}

async function addPhrase(nouveauTexte) {
	const popTexteHtml = populateTxt(nouveauTexte);
	episode += popTexteHtml;

	// Use a temporary element to convert HTML to plain text.
	const tempDiv = document.createElement('div');
	tempDiv.innerHTML = popTexteHtml;
	const plainText = tempDiv.textContent || tempDiv.innerText || '';

	await enqueuePhrase(plainText);

	// Crée un élément span pour le texte ajouté
	const span = document.createElement('span');
	span.classList.add('new-content');
	span.innerHTML = popTexteHtml;
	const episodeDisplay = document.getElementById('CurrentEpisode');
	episodeDisplay.appendChild(span);
	setTimeout(() => span.classList.add('visible'), 80);	// Déclenche l'animation en ajoutant la classe visible
}

////////////// GAME LOGIC
function incrYear() {
	const randomYears = Math.floor(Math.random() * 3);
    year += randomYears;
	kLvl += randomYears;
}

function saveState() {
	localStorage.setItem("persData", JSON.stringify(currentData));
	localStorage.setItem("persYear", year);
	localStorage.setItem("persHP", kHP);
	localStorage.setItem("persLvl", kLvl);
	localStorage.setItem("persPeons", kPeons);
	localStorage.setItem("persGold", kGold);
	localStorage.setItem("persEpisodeCount", episodeCount);
}

function createDataContext () {
	eraData = fetchFromObject(advData.era, era);
	biome = rFA(advData.biomeTypes);
	biomeData = fetchFromObject(advData.biom, biome);
}

function checkVitals () {
	while (kHP <= 0) {
		addPhrase("Notre héros mourut soudainement. 🦟🦠🪰🦠🦟 ");
		gameOver();
		break;
	}
	while (kLvl >= 130) {
		addPhrase("Vanitas vanitatis, omnia vanitas! Memento mori sed lex nec mergitur. Notre héros mourut de vieillesse. ☠️🕸️☠️ ");
		gameOver();
		break;
	}
	while (kGold <= 0) {
		addPhrase("Banqueroûte ! Notre héros finit ruiné. 🧐🤑🧐🤑 ");
		gameOver();
		break;
	}
	while (kPeons <= 0) {
		addPhrase("Trahison ! Notre héros perdit tout soutien et fut assassiné. 🩸🔪🩸🔪🩸 ");
		gameOver();
		break;
	}
}

function upkeep () {
		//	Aging
	while (kLvl >= 50)	{
		kHP 	-= 	Math.floor(Math.random() * 2) * kLvl * .02;
		break;
	}
	// 	//	Holiness by wholeness
	// while (kHP >= 10) {
	// 	kPeons	+=	Math.floor(Math.random() * 2) * kHP * .1;
	// 	break;
	// }
	// 	//	Snowball
	// while (kPeons >= 10)	{
	// 	kPeons	+=	Math.floor(Math.random() * 2) * kPeons * .1;
	// 	kGold	-=	Math.floor(Math.random() * 2) * kPeons * .1;
	// 	break;
	// }
	// 	//	Interest Rates and Jealousy
	// while (kGold >= 10)	{
	// 	kPeons 	-=	Math.floor(Math.random() * 2) * kGold * .1;
	// 	kGold 	+=	Math.floor(Math.random() * 2) * kGold * .1;
	// 	break;
	// }
}

function moveOn ()	{
	saga += episode ;
	episode = "";
	episodeCount ++;
	isSpeaking =false; isPaused=false;
	window.speechSynthesis.cancel();
	phraseQueue.length = 0;
	updateSpeechControls();

	currentData =  [kName, kFief, kTitle, romance, nemesis, saga];
	incrYear();
	upkeep ();
	checkVitals();
	saveState();
	displayAll();
	createDataContext();
	// createDisplayElements();

	startEpisode();
}

function updateButtons(actions) {
	const container = document.getElementById("actionContainer");
	container.innerHTML = "";
	actions.forEach(action => {
		if (!action.condition || action.condition()) {
			const button = document.createElement("button");

			// Apply background color
			if (action.bgGradient) {
				button.style.backgroundImage = action.bgGradient;
			}

			// Apply border colors
			if (action.borderColor) {
                button.style.borderColor = action.borderColor;
            }

			// Apply font color
			if (action.fontColor) {
				button.style.color = action.fontColor;
			}

			const healthEmoji = "❤️", goldEmoji = "🪙", peonEmoji = "👤";
			const formatNumber = num => (num >= 0 ? `+${num}` : `${num}`);			

			let textParts = [];
			if (action.healthChange !== 0) textParts.push(`${formatNumber(action.healthChange)} ${healthEmoji}`);
			if (action.goldChange !== 0) textParts.push(`${formatNumber(action.goldChange)} ${goldEmoji}`);
			if (action.peonChange !== 0) textParts.push(`${formatNumber(action.peonChange)} ${peonEmoji}`);
			button.innerText = textParts.length > 0 ? `${action.name}\n${textParts.join("\n")}` : action.name;

			if (action.animationAppear) {
			button.classList.add(action.animationAppear);
			playSound(action.soundAppear);
			button.addEventListener("animationend", () => {
				button.classList.remove(action.animationAppear);
			});
			}

			button.addEventListener("click", () => {
					kHP += Math.floor(Math.random() * action.healthChange *2) ;
					kGold += Math.floor(Math.random() * action.goldChange *2) ;
					kPeons += Math.floor(Math.random() * action.peonChange *2) ;
					fullEmojiDisplay();
					updateScore();
					checkVitals();
					addPhrase(action.report);
			
				if (action.animationClick) {
					button.classList.add(action.animationClick);
					playSound(action.soundClick);
					button.addEventListener("animationend", function() {
						button.classList.remove(action.animationClick);
						if (action.animationDisappear) {
							button.classList.add(action.animationDisappear);
							playSound(action.soundDisappear);
							button.addEventListener("animationend", function() {
							button.remove();
							updateButtons(actions); // Met à jour tous les boutons.
							});
						} else {
							button.remove();
							updateButtons(actions); // Met à jour tous les boutons.
						}
					});
				} else {
					button.remove();
					updateButtons(actions); // Met à jour tous les boutons.
				}
			});
		container.appendChild(button);
	}
	});
}

async function startEpisode() {
	document.getElementById("nextEpisode").innerHTML = "<h1>Épisode Suiv.</h1>";
	document.getElementById("CurrentEpisode").innerHTML = "";
	document.getElementById("actionContainer").innerHTML = "";
    if (episodeCount === 1) {
		await addPhrase(`<h3>°intro°</h3>`);
		await addPhrase (`<p>°presentation°<b>${kName}</b>, qui °vb.reign° ${kFief} à partir de °season° de l'an <b>${year}</b>. Il avait alors ${kLvl} ans...</p>`)
		await addPhrase(`<p>Il avait ''pet'' et °vb.love° sa promise si °adj.fgood°, ${romance}. `);
		await addPhrase(`<h3>Épisode 1 :</h3><p>En ${year}, il °vb.go° °n.fief° de °n.foes° après avoir °adv.slow° contemplé °n.view° une dernière fois. `);
	} else if (episodeCount === 2) {
		await addPhrase(`<h3>Épisode 2 :</h3>`);
		await addPhrase (`<p><b>En ${year}, ${kName}</b> se vit appeler ''nick'' pour la première fois par les ''trades'' °adj.pbad°.</p>`);
		await addPhrase (`<p>En tant que <b>°n.roi° de ${kFief}</b>, sa relation avec ${romance} était un peu <i>problématique</i>. En effet, <b>${nemesis}</b> lui enviait cette amourette...`);
	
	} else if (episodeCount === 3) {
		await addPhrase(`<h3>Épisode 3 :</h3><p><b>En <b>${year}, le ${kTitle} rencontra sa °adj.fgood° jument ''fname'', qui était °adj.fgood° autant que °adj.fgood°.</p><p>${kFief} vivait des moments difficiles, et ${romance} semblait se détourner de lui au profit de <b>${nemesis}</b>... `);
	} else if (episodeCount > 3) {
		await addPhrase(`<h3>Épisode ${episodeCount} :</h3><p><b>En ${year},</p> son règne continua. Il avait vu #wild# à #loc# et ''mname'' ''nick'' l'accompagnait dans ${kFief}. ${romance} semblait plus disposée que jamais et ${kName} °vb.love° cette situation.</p>`);
	}

	updateButtons(actions);	
}

function fadeOut(audioElement, duration) {
    const step = 200; // How frequently (in ms) to decrease the volume
    const fadeInterval = duration / (audioElement.volume * 100); // Calculate decrement interval
    const fadeTimer = setInterval(() => {
        if (audioElement.volume > 0.01) {
            audioElement.volume = Math.max(0, audioElement.volume - 0.01); // Gradually decrease volume
        } else {
            clearInterval(fadeTimer); // Stop once volume reaches 0
            audioElement.pause();
        }
    }, fadeInterval);
}

function gameOver()	{
	if (isGameOver) return;
	isGameOver = true;
	addPhrase("<BR>Ainsi mourut ce potentat °adj.mbad°...");
	saga += episode ;
	episode = "";
	exportSaga();
	
	// Disable all buttons to block interactions
	const buttons = document.querySelectorAll("button");
	buttons.forEach((button) => {
		button.disabled = true;
	});
	
	const audio = new Audio("./evillaugh.ogg");
	audio.volume = 0.8;
	audio.play();
	fadeOut(audio, 4000);

    // Use a small delay to ensure the browser renders the image before continuing
    setTimeout(() => {
		var kingImage = "/images/kings/dead.png";
		(document.getElementById("kingImage")).src = kingImage;
		(document.getElementById("kingImage")).alt = `GAME OVER`;

		document.body.classList.add('fade-to-black');

		// Gradually dim opacity (simulate a fading effect)
		const bodyElement = document.querySelector("body");
		bodyElement.style.transition = "filter 3500ms ease-in-out"; // Smooth transition
		bodyElement.style.filter = "brightness(1%)"; // Dim brightness
			
		setTimeout(() => {
			buttons.forEach((button) => {
			button.disabled = false;
			});
			// Clear local storage and reload location
			localStorage.clear();
			phraseQueue.length = 0;
			window.speechSynthesis.cancel();
			location.reload();
		}, 6000);
	}, 50);	
}

////////////// JQUERY
$(function() {

	//	Import data
	$.getJSON("/data/data.json", function(_advData) {
		advData = _advData;
	})

	.then(()=>{
		initializeSpeechSynthesis();
		
		//	Check for Persistance and import persistent values from array if they exist. 
		if (localStorage.hasOwnProperty("persData")) {
			var gameState = JSON.parse(localStorage.getItem("persData"));
			kName 	= 	gameState[0];
			kFief 	= 	gameState[1];
			kTitle 	= 	gameState[2];
			romance = 	gameState[3];
			nemesis	=	gameState[4];
			saga 	=	gameState[5];

			//	Retrieve current ints from dataStorage
			year 	= 	parseInt(localStorage.getItem("persYear"));
			era		=	updateEra(year);

			kLvl 	= 	parseInt(localStorage.getItem("persLvl"));
			kGold 	= 	parseInt(localStorage.getItem("persGold"));
			kPeons 	= 	parseInt(localStorage.getItem("persPeons"));
			kHP 	= 	parseInt(localStorage.getItem("persHP"));
			episodeCount = parseInt(localStorage.getItem("persEpisodeCount"));
			episode = "";
			document.getElementById("CurrentEpisode").innerHTML = "<h1>Nouvel épisode</h1>";
		}
			
		else {
			// 	Generate starter
			kLvl = Math.floor(Math.random() * 6) + 12;
			kGold = Math.floor(Math.random() * 10) + 2;
			kPeons = Math.floor(Math.random() * 10) + 2;
			kHP = Math.floor(Math.random() * 8) + 1;
			year = rollRandomYear(-4000, 2100);
			era = updateEra(year);

			eraData = fetchFromObject(advData.era, era);
			kName = rFA(eraData.mname) + " " + rFA(advData.nicks);
			kFief = rFA(eraData.fief);
			kTitle = rFA(eraData.title);		
			romance = rFA(eraData.fname) + " de " + rFA(eraData.clan);
			nemesis = rFA(eraData.mname) + " le " + rFA(advData.adj.mbad);
			saga = "<h3>Loukass présente :</h3>";
			episode = "";
			document.getElementById("CurrentEpisode").innerHTML = "<H2>Bienvenue !</h2><p>Le KarmaTron te permet de contrôler la destinée d'un tyran. Plus <b>la saga s'allonge</b>, et plus le score s'accumule !</b></p><p>Tu marqueras également des Points bonus pour chaque <b>ressource : Vie (❤️), Or (🪙), Serviteurs (👤)</b>.</p><p>Le pouvoir est imparfait : tes boutons t'indiqueront les ressources que coûte l'action <b>en moyenne</b> ! Les gains ou pertes annoncés peuvent aller <b>de zéro au double</b>, et rien n'est garanti.</p><p>Pour concrétiser ton score, utilise le bouton Avancer afin d'écrire les exploits de cette année dans la Saga. À la fin du jeu, <b>tu recevras un parchemin</b> résumant l'histoire de ton protégé !</p><p>Amuse-toi bien, ô ! Historien.ne en herbe...</p>";
		}

		displayAll();
	
		//	TEXT GEN
		createDataContext ();
		// createDisplayElements ();
		
		$('#nextEpisode').click(function() {
			moveOn();
		});

		$("#pauseResumeButton").on("click", togglePauseResume);

		$("#skipButton").on("click", skipCurrentUtterance);

		$("#muteButton").on("click", toggleMute);

		$('#reset').click(function() {			
			window.speechSynthesis.cancel();
			phraseQueue.length=0;
			localStorage.clear();
			location.reload();
		});

		$("#read-btn").on("click", function() {
			let textToRead = "";
			$(".read-aloud").each(function() {
			textToRead += $(this).text() + " ";
			});
	
			phraseQueue.push(textToRead);
			processQueue();
		});

		$("#saveButton").on("click", exportSaga);		

		$('#music').click(function() {
			const audio = new Audio("http://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/intromusic.ogg");
			audio.volume = .6;
			audio.play();
		});	
	});	
});