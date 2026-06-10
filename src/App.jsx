import { useState, useEffect, useCallback, useRef } from "react";

// --- REAL CARD DATA (v2.2) ---
const CORE_CARDS = [
  {id:"b1a",type:"Core",suit:"Brutal",name:"Brutal 1",value:1,zone:"High",attack:2,defence:1,flavour:"A clumsy swing telegraphed long before it lands.",notes:"push"},
  {id:"b1b",type:"Core",suit:"Brutal",name:"Brutal 1",value:1,zone:"High",attack:2,defence:1,flavour:"An awkward hack chips the floorboards more than the foe.",notes:"push"},
  {id:"b2a",type:"Core",suit:"Brutal",name:"Brutal 2",value:2,zone:"Low",attack:3,defence:1,flavour:"A lumbering strike forces them back by sheer weight.",notes:"push"},
  {id:"b2b",type:"Core",suit:"Brutal",name:"Brutal 2",value:2,zone:"Low",attack:3,defence:1,flavour:"You heave forward, your strength barely controlled.",notes:"push"},
  {id:"b3a",type:"Core",suit:"Brutal",name:"Brutal 3",value:3,zone:"High",attack:4,defence:1,flavour:"A smashing blow rattles their guard with brute force.",notes:"push"},
  {id:"b3b",type:"Core",suit:"Brutal",name:"Brutal 3",value:3,zone:"High",attack:4,defence:1,flavour:"A vicious chop sends sparks flying from crossing blades.",notes:"push"},
  {id:"b4a",type:"Core",suit:"Brutal",name:"Brutal 4",value:4,zone:"Low",attack:5,defence:2,flavour:"A crushing strike batters their defences wide open.",notes:"push"},
  {id:"b4b",type:"Core",suit:"Brutal",name:"Brutal 4",value:4,zone:"Low",attack:5,defence:2,flavour:"Your blade carves downward with bone-shaking power.",notes:"push"},
  {id:"b5a",type:"Core",suit:"Brutal",name:"Brutal 5",value:5,zone:"High",attack:6,defence:3,flavour:"A thunderous overhand smash could split a shield in two.",notes:"push"},
  {id:"b5b",type:"Core",suit:"Brutal",name:"Brutal 5",value:5,zone:"High",attack:6,defence:3,flavour:"A devastating chop drives them back in sheer panic.",notes:"push"},
  {id:"e1a",type:"Core",suit:"Elegant",name:"Elegant 1",value:1,zone:"High",attack:0,defence:3,flavour:"A deft parry flicks their blade aside with effortless grace.",notes:""},
  {id:"e1b",type:"Core",suit:"Elegant",name:"Elegant 1",value:1,zone:"High",attack:0,defence:3,flavour:"You deflect the blow with the lightest touch of steel.",notes:""},
  {id:"e2a",type:"Core",suit:"Elegant",name:"Elegant 2",value:2,zone:"Low",attack:1,defence:4,flavour:"A quick thrust darts low, catching them unprepared.",notes:""},
  {id:"e2b",type:"Core",suit:"Elegant",name:"Elegant 2",value:2,zone:"Low",attack:1,defence:4,flavour:"A neat slash aims high, as precise as a needle's point.",notes:""},
  {id:"e3a",type:"Core",suit:"Elegant",name:"Elegant 3",value:3,zone:"High",attack:2,defence:5,flavour:"A balanced strike forces them back with perfect timing.",notes:""},
  {id:"e3b",type:"Core",suit:"Elegant",name:"Elegant 3",value:3,zone:"High",attack:2,defence:5,flavour:"Your blade whirls in a smooth arc, elegant yet firm.",notes:""},
  {id:"e4a",type:"Core",suit:"Elegant",name:"Elegant 4",value:4,zone:"Low",attack:3,defence:6,flavour:"A flawless cut slices through their guard with artistry.",notes:""},
  {id:"e4b",type:"Core",suit:"Elegant",name:"Elegant 4",value:4,zone:"Low",attack:3,defence:6,flavour:"Your sword sings in a graceful arc that dazzles onlookers.",notes:""},
  {id:"e5a",type:"Core",suit:"Elegant",name:"Elegant 5",value:5,zone:"High",attack:4,defence:7,flavour:"A masterstroke of precision drives them back reeling.",notes:""},
  {id:"e5b",type:"Core",suit:"Elegant",name:"Elegant 5",value:5,zone:"High",attack:4,defence:7,flavour:"Your supreme technique delivers a strike beyond reproach.",notes:""},
  {id:"d1a",type:"Core",suit:"Daring",name:"Daring 1",value:1,zone:"High",attack:3,defence:0,flavour:"A wild swipe nearly topples you off balance.",notes:""},
  {id:"d1b",type:"Core",suit:"Daring",name:"Daring 1",value:1,zone:"High",attack:3,defence:0,flavour:"A rash flick of the wrist leaves you exposed.",notes:""},
  {id:"d2a",type:"Core",suit:"Daring",name:"Daring 2",value:2,zone:"Low",attack:4,defence:0,flavour:"A reckless leap lunges you dangerously close.",notes:""},
  {id:"d2b",type:"Core",suit:"Daring",name:"Daring 2",value:2,zone:"Low",attack:4,defence:0,flavour:"You hurl yourself low, blade flashing with abandon.",notes:""},
  {id:"d3a",type:"Core",suit:"Daring",name:"Daring 3",value:3,zone:"High",attack:5,defence:0,flavour:"A bold cut whistles past, narrowly missing the mark.",notes:""},
  {id:"d3b",type:"Core",suit:"Daring",name:"Daring 3",value:3,zone:"High",attack:5,defence:0,flavour:"You fling yourself into a sweeping strike that risks collapse.",notes:""},
  {id:"d4a",type:"Core",suit:"Daring",name:"Daring 4",value:4,zone:"Low",attack:6,defence:1,flavour:"An audacious slash drives them staggering, but leaves you open.",notes:""},
  {id:"d4b",type:"Core",suit:"Daring",name:"Daring 4",value:4,zone:"Low",attack:6,defence:1,flavour:"You vault forward, blade arcing wide in a showy gamble.",notes:""},
  {id:"d5a",type:"Core",suit:"Daring",name:"Daring 5",value:5,zone:"High",attack:7,defence:2,flavour:"An outrageous lunge threatens disaster for you both if it fails.",notes:""},
  {id:"d5b",type:"Core",suit:"Daring",name:"Daring 5",value:5,zone:"High",attack:7,defence:2,flavour:"You stake everything on a flamboyant stroke that dazzles the crowd.",notes:""},
  {id:"i1a",type:"Core",suit:"Improvised",name:"Improvised 1",value:1,zone:"High",attack:1,defence:1,flavour:"A handful of coins scatters in their eyes.",notes:"gap"},
  {id:"i1b",type:"Core",suit:"Improvised",name:"Improvised 1",value:1,zone:"High",attack:1,defence:1,flavour:"A pinch of sand blinds them for just a heartbeat.",notes:"gap"},
  {id:"i2a",type:"Core",suit:"Improvised",name:"Improvised 2",value:2,zone:"Low",attack:2,defence:2,flavour:"You shove a stumbling drunkard into their path.",notes:"gap"},
  {id:"i2b",type:"Core",suit:"Improvised",name:"Improvised 2",value:2,zone:"Low",attack:2,defence:2,flavour:"A small stool clatters into their shins.",notes:"gap"},
  {id:"i3a",type:"Core",suit:"Improvised",name:"Improvised 3",value:3,zone:"High",attack:3,defence:3,flavour:"A heavy tankard arcs toward their jaw with a dull thud.",notes:"gap"},
  {id:"i3b",type:"Core",suit:"Improvised",name:"Improvised 3",value:3,zone:"High",attack:3,defence:3,flavour:"You heave a barstool sideways, forcing them to dodge.",notes:"gap"},
  {id:"i4a",type:"Core",suit:"Improvised",name:"Improvised 4",value:4,zone:"Low",attack:4,defence:4,flavour:"A flaming oil-lamp smashes at their feet, fire licking upward.",notes:"gap"},
  {id:"i4b",type:"Core",suit:"Improvised",name:"Improvised 4",value:4,zone:"Low",attack:4,defence:4,flavour:"You brandish a jagged bottle, lunging with menace.",notes:"gap"},
  {id:"i5a",type:"Core",suit:"Improvised",name:"Improvised 5",value:5,zone:"High",attack:5,defence:5,flavour:"A glowing hot poker whistles toward their face.",notes:"gap"},
  {id:"i5b",type:"Core",suit:"Improvised",name:"Improvised 5",value:5,zone:"High",attack:5,defence:5,flavour:"You swing a hefty cask lid like a battering ram.",notes:"gap"},
  // Wild cards
  {id:"bw1",type:"Wild",suit:"Brutal",name:"Brutal Wild 1",value:1,zone:"Wild",attack:1,defence:1,flavour:"A ragged chop aimed carelessly high or low.",notes:"push"},
  {id:"bw2",type:"Wild",suit:"Brutal",name:"Brutal Wild 2",value:2,zone:"Wild",attack:2,defence:2,flavour:"A broad cut could crash high or low, heavy but imprecise.",notes:"push"},
  {id:"bw3",type:"Wild",suit:"Brutal",name:"Brutal Wild 3",value:3,zone:"Wild",attack:3,defence:3,flavour:"A wild, heavy swing arcs unpredictably, promising pain.",notes:"push"},
  {id:"bw4",type:"Wild",suit:"Brutal",name:"Brutal Wild 4",value:4,zone:"Wild",attack:4,defence:4,flavour:"An unrelenting blow could cleave high or low, all weight and rage.",notes:"push"},
  {id:"bw5",type:"Wild",suit:"Brutal",name:"Brutal Wild 5",value:5,zone:"Wild",attack:5,defence:5,flavour:"An unstoppable swing, high or low, that leaves nothing standing.",notes:"push"},
  {id:"ew1",type:"Wild",suit:"Elegant",name:"Elegant Wild 1",value:1,zone:"Wild",attack:1,defence:1,flavour:"A delicate feint, high or low, more flourish than threat.",notes:""},
  {id:"ew2",type:"Wild",suit:"Elegant",name:"Elegant Wild 2",value:2,zone:"Wild",attack:2,defence:2,flavour:"A fluid cut, high or low, flowing like water.",notes:""},
  {id:"ew3",type:"Wild",suit:"Elegant",name:"Elegant Wild 3",value:3,zone:"Wild",attack:3,defence:3,flavour:"A poised flourish, high or low, carried by discipline.",notes:""},
  {id:"ew4",type:"Wild",suit:"Elegant",name:"Elegant Wild 4",value:4,zone:"Wild",attack:4,defence:4,flavour:"A dazzling strike, high or low, that weds beauty to deadliness.",notes:""},
  {id:"ew5",type:"Wild",suit:"Elegant",name:"Elegant Wild 5",value:5,zone:"Wild",attack:5,defence:5,flavour:"An exquisite blow, high or low, that epitomises perfection.",notes:""},
  {id:"dw1",type:"Wild",suit:"Daring",name:"Daring Wild 1",value:1,zone:"Wild",attack:1,defence:1,flavour:"A clumsy flourish, high or low, more daring than effective.",notes:""},
  {id:"dw2",type:"Wild",suit:"Daring",name:"Daring Wild 2",value:2,zone:"Wild",attack:2,defence:2,flavour:"A flamboyant strike, high or low, thrilling but careless.",notes:""},
  {id:"dw3",type:"Wild",suit:"Daring",name:"Daring Wild 3",value:3,zone:"Wild",attack:3,defence:3,flavour:"A fearless flourish, high or low, daring both victory and disaster.",notes:""},
  {id:"dw4",type:"Wild",suit:"Daring",name:"Daring Wild 4",value:4,zone:"Wild",attack:4,defence:4,flavour:"A reckless assault, high or low, that teeters on folly.",notes:""},
  {id:"dw5",type:"Wild",suit:"Daring",name:"Daring Wild 5",value:5,zone:"Wild",attack:5,defence:5,flavour:"A glorious slash, high or low, reckless brilliance incarnate.",notes:""},
  {id:"iw1",type:"Wild",suit:"Improvised",name:"Improvised Wild 1",value:1,zone:"Wild",attack:1,defence:1,flavour:"You fling a dripping rag, distracting them with the stench.",notes:"gap"},
  {id:"iw2",type:"Wild",suit:"Improvised",name:"Improvised Wild 2",value:2,zone:"Wild",attack:2,defence:2,flavour:"A stray chicken flaps wildly, thrown between you both.",notes:"gap"},
  {id:"iw3",type:"Wild",suit:"Improvised",name:"Improvised Wild 3",value:3,zone:"Wild",attack:3,defence:3,flavour:"A half-eaten ham hock spins through the air, greasy and distracting.",notes:"gap"},
  {id:"iw4",type:"Wild",suit:"Improvised",name:"Improvised Wild 4",value:4,zone:"Wild",attack:4,defence:4,flavour:"A poker snatched from the fire sends sparks flying dangerously close.",notes:"gap"},
  {id:"iw5",type:"Wild",suit:"Improvised",name:"Improvised Wild 5",value:5,zone:"Wild",attack:5,defence:5,flavour:"A meat cleaver from the kitchen flashes in the dim light.",notes:"gap"},
];

// Persona starter cards (single-use per duel)
const PERSONA_CARDS = {
  gallant_captain:[
    {id:"gc1",type:"Persona",suit:"Brutal",name:"Heroic Lunge",zone:"High",attack:5,defence:2,flavour:"The Captain hurls forward with a roar.",effect:"Push 3",push:3,singleUse:true},
    {id:"gc2",type:"Persona",suit:"",name:"Hold the Line",zone:"—",attack:0,defence:99,flavour:"The Captain plants their feet and turns the blow aside.",effect:"Auto-parry one attack. Draw 1.",singleUse:true},
    {id:"gc3",type:"Persona",suit:"",name:"Captain's Roar",zone:"—",attack:0,defence:0,flavour:"A thunderous shout rattles the opponent's nerves.",effect:"Gain +1 Bravado. Opponent discards 1 random card.",singleUse:true},
  ],
  masked_avenger:[
    {id:"ma1",type:"Persona",suit:"Daring",name:"Shadow Strike",zone:"Low",attack:4,defence:2,flavour:"The blade materialises from shadow with no warning.",effect:"On hit: opponent discards 1 card.",singleUse:true},
    {id:"ma2",type:"Persona",suit:"",name:"Vanish",zone:"—",attack:0,defence:0,flavour:"One moment present, the next — gone.",effect:"Retreat 1. Gain +1 Bravado.",singleUse:true},
    {id:"ma3",type:"Persona",suit:"Elegant",name:"Revenge Blade",zone:"High",attack:3,defence:3,flavour:"A precise, inevitable strike delivered without a word.",effect:"If it lands, Push +1.",push:1,singleUse:true},
  ],
  tavern_brawler:[
    {id:"tb1",type:"Persona",suit:"Improvised",name:"Bottle Smash",zone:"Low",attack:4,defence:2,flavour:"Glass shatters across their jaw with a satisfying crack.",effect:"On hit: deal +1 Bravado damage.",singleUse:true},
    {id:"tb2",type:"Persona",suit:"",name:"Table Flip",zone:"—",attack:0,defence:99,flavour:"The table goes up between them, buying a moment.",effect:"Auto-parry one High attack. Push 1.",singleUse:true},
    {id:"tb3",type:"Persona",suit:"",name:"Brawl Instinct",zone:"—",attack:0,defence:0,flavour:"Instinct takes over — the Brawler reaches for whatever comes to hand.",effect:"Draw 2, then discard 1.",singleUse:true},
  ],
  elegant_duelist:[
    {id:"ed1",type:"Persona",suit:"Elegant",name:"Flawless Cut",zone:"Low",attack:4,defence:3,flavour:"A single immaculate slice, perfectly timed and placed.",effect:"Draw 1 if it lands.",singleUse:true},
    {id:"ed2",type:"Persona",suit:"Elegant",name:"One-Handed Salute",zone:"High",attack:3,defence:3,flavour:"A mocking salute that becomes a strike before they realise it.",effect:"If un-parried: gain +1 Bravado and Push 1.",singleUse:true},
    {id:"ed3",type:"Persona",suit:"Elegant",name:"Perfect Counter",zone:"High",attack:2,defence:2,flavour:"The Duelist turns the blade aside and answers in the same motion.",effect:"Auto-parry one attack, then counter with Elegant High ATK 2 / DEF 2.",singleUse:true},
  ],
  pirate_queen:[
    {id:"pq1",type:"Persona",suit:"Improvised",name:"Kick the Powder Keg",zone:"High",attack:3,defence:2,flavour:"The keg rolls and explodes, hurling them backward.",effect:"On hit, Push +2.",push:2,singleUse:true},
    {id:"pq2",type:"Persona",suit:"",name:"Boarding Cry",zone:"—",attack:0,defence:0,flavour:"A battle cry that carries across the deck and into their nerve.",effect:"Gain +1 Bravado. Advance 1.",singleUse:true},
    {id:"pq3",type:"Persona",suit:"Brutal",name:"Cutlass Slash",zone:"Low",attack:4,defence:2,flavour:"A pirate's clean, brutal cut — no ceremony, all business.",effect:"Standard Brutal attack.",singleUse:true},
  ],
  street_urchin:[
    {id:"su1",type:"Persona",suit:"Improvised",name:"Cheap Shot",zone:"Low",attack:2,defence:2,flavour:"A grubby hand darts out and plucks something useful from their grip.",effect:"On hit: steal 1 card at random from opponent's hand.",singleUse:true},
    {id:"su2",type:"Persona",suit:"",name:"Quick Fingers",zone:"—",attack:0,defence:0,flavour:"Nimble fingers trade one card for another before anyone notices.",effect:"Swap 1 card in hand with top of deck.",singleUse:true},
    {id:"su3",type:"Persona",suit:"Wild",name:"Scrappy Leap",zone:"High",attack:3,defence:2,flavour:"A scrabbling, unlikely attack — and then they're gone.",effect:"Retreat 1 after play.",singleUse:true},
  ],
  cardinals_guard:[
    {id:"cg1",type:"Persona",suit:"",name:"Shield Wall",zone:"—",attack:0,defence:99,flavour:"The shield comes up, the attack is absorbed.",effect:"Auto-parry one attack. Push 1.",singleUse:true},
    {id:"cg2",type:"Persona",suit:"",name:"For the Cardinal!",zone:"—",attack:0,defence:0,flavour:"Faith and duty make an effective armour.",effect:"Gain +1 Bravado. Next Push is ignored.",singleUse:true},
    {id:"cg3",type:"Persona",suit:"Brutal",name:"Relentless Press",zone:"Low",attack:4,defence:2,flavour:"An advance that refuses to stop.",effect:"Push 2.",push:2,singleUse:true},
  ],
  foppish_noble:[
    {id:"fn1",type:"Persona",suit:"Elegant",name:"Elegant Flourish",zone:"High",attack:4,defence:3,flavour:"The blade finds its mark with insufferable ease.",effect:"Gain +1 Bravado if it lands.",singleUse:true},
    {id:"fn2",type:"Persona",suit:"",name:"Coward's Dodge",zone:"—",attack:0,defence:0,flavour:"A dignified step backward that the Noble refuses to call a retreat.",effect:"Retreat 1. Ignore Bravado loss.",singleUse:true},
    {id:"fn3",type:"Persona",suit:"",name:"Mocking Wit",zone:"—",attack:0,defence:0,flavour:"A perfectly timed aside that makes them second-guess every card they hold.",effect:"Opponent discards 1 card of their choice.",singleUse:true},
  ],
  vengeful_widow:[
    {id:"vw1",type:"Persona",suit:"Brutal",name:"Grief Fury",zone:"High",attack:5,defence:2,flavour:"A strike powered by something colder and more certain than rage.",effect:"On hit: +1 Bravado damage.",singleUse:true},
    {id:"vw2",type:"Persona",suit:"",name:"Cold Defiance",zone:"—",attack:0,defence:99,flavour:"She turns the blow aside with contempt.",effect:"Auto-parry one Low attack. Opponent loses 1 Bravado.",singleUse:true},
    {id:"vw3",type:"Persona",suit:"",name:"Last Stand",zone:"—",attack:0,defence:0,flavour:"She has nothing left to lose.",effect:"Gain +2 Bravado if at 3 or fewer.",singleUse:true},
  ],
  rogue_scholar:[
    {id:"rs1",type:"Persona",suit:"Elegant",name:"Calculated Strike",zone:"Low",attack:3,defence:3,flavour:"The strike was planned. So was the information it revealed.",effect:"Look at opponent's hand after.",singleUse:true},
    {id:"rs2",type:"Persona",suit:"",name:"Lecture",zone:"—",attack:0,defence:0,flavour:"An infuriating monologue that somehow leaves them holding fewer options.",effect:"Opponent discards 1 of their choice. Draw 1.",singleUse:true},
    {id:"rs3",type:"Persona",suit:"Improvised",name:"Improvised Gambit",zone:"High",attack:4,defence:2,flavour:"A solution to a problem they hadn't anticipated.",effect:"Standard Improvised attack.",singleUse:true},
  ],
  highwayman:[
    {id:"hw1",type:"Persona",suit:"Daring",name:"Ambush Strike",zone:"Low",attack:3,defence:2,flavour:"They never saw it coming — that was the point.",effect:"On hit: opponent discards 1 card.",singleUse:true},
    {id:"hw2",type:"Persona",suit:"Improvised",name:"Black Powder Shot",zone:"High",attack:4,defence:1,flavour:"A flash, a bang, and they're staggering backward.",effect:"If un-parried: Push +2.",singleUse:true},
    {id:"hw3",type:"Persona",suit:"",name:"Highway Escape",zone:"—",attack:0,defence:0,flavour:"Vanishes into the night before they can press the advantage.",effect:"Retreat 2. Lose only 1 Bravado.",singleUse:true},
  ],
  acrobat:[
    {id:"ac1",type:"Persona",suit:"Elegant",name:"Wall Run",zone:"High",attack:3,defence:2,flavour:"Off the wall, through the air, blade first — all in one motion.",effect:"Advance 1, then Attack.",singleUse:true},
    {id:"ac2",type:"Persona",suit:"Improvised",name:"Tumble Kick",zone:"Low",attack:4,defence:2,flavour:"A rolling kick that sends them tumbling.",effect:"Push 2.",push:2,singleUse:true},
    {id:"ac3",type:"Persona",suit:"Wild",name:"Swinging Entrance",zone:"High",attack:5,defence:2,flavour:"They arrive from an entirely unexpected direction.",effect:"Advance into opponent's space.",singleUse:true},
  ],
};

// Signature moves
const SIGNATURES = {
  gallant_captain:{name:"Rally the Crew",effect:"Gain 2 Bravado. Opponent discards 1 card of their choice."},
  masked_avenger:{name:"Now You See Me",effect:"Retreat 2 at no Bravado cost. Until your next turn, all your cards are Wild zone."},
  tavern_brawler:{name:"Last Man Standing",effect:"Discard hand, draw 5. Next attack: +1 Bravado damage per Improvised card in new hand (max +3)."},
  elegant_duelist:{name:"The Perfect Form",effect:"Until end of turn: Elegant cards +1 Atk & +1 Def. Full 3-card Elegant remise draws 2."},
  pirate_queen:{name:"Take No Quarter",effect:"Advance 2 free. If adjacent, first attack +2 Atk. Opponent cannot voluntarily Retreat this turn."},
  street_urchin:{name:"You Never Saw Me",effect:"Steal 2 cards at random from opponent's hand. Gain 1 Bravado per card stolen (max +2)."},
  cardinals_guard:{name:"Hold This Ground",effect:"Until your next turn: cannot be Pushed. Attacks that land deal –1 Bravado damage (minimum 1)."},
  foppish_noble:{name:"How Tedious You Are",effect:"Opponent discards down to 3 cards. Noble draws 1 and gains 1 Bravado."},
  vengeful_widow:{name:"For What You Did",effect:"Next attack this turn cannot be parried. Lands automatically."},
  rogue_scholar:{name:"I Anticipated This",effect:"Look at top 5 deck cards. Take 1, return rest in any order. First parry this turn +2 Defence."},
  highwayman:{name:"Stand and Deliver",effect:"Opponent reveals full hand. Choose 1 card to discard. Draw 1 card."},
  acrobat:{name:"Impossible Angle",effect:"Swap track positions with opponent. Immediately take one free Attack action."},
};

// Persona definitions with correct Bravado
const PERSONAS = [
  {id:"gallant_captain",name:"Gallant Captain",startBravado:12},
  {id:"masked_avenger",name:"Masked Avenger",startBravado:9},
  {id:"tavern_brawler",name:"Tavern Brawler",startBravado:12},
  {id:"elegant_duelist",name:"Elegant Duelist",startBravado:12},
  {id:"pirate_queen",name:"Pirate Queen",startBravado:12},
  {id:"street_urchin",name:"Street Urchin",startBravado:11},
  {id:"cardinals_guard",name:"Cardinal's Guard",startBravado:9},
  {id:"foppish_noble",name:"Foppish Noble",startBravado:12},
  {id:"vengeful_widow",name:"Vengeful Widow",startBravado:12},
  {id:"rogue_scholar",name:"Rogue Scholar",startBravado:12},
  {id:"highwayman",name:"Highwayman",startBravado:12,startCards:4},
  {id:"acrobat",name:"Acrobat",startBravado:12},
];

// --- HELPERS ---
function isEffectCard(card) {
  // Persona cards that are pure effects — zone "—" or zero attack
  return card && card.type === "Persona" && (card.zone === "—" || card.attack === 0);
}

function shuffle(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

function buildSharedDeck(){
  // Shared deck: Core + Wild cards only. Persona starters go directly into hand.
  return shuffle(CORE_CARDS.map(c=>({...c,uid:c.id+"-"+Math.random().toString(36).slice(2)})));
}

function drawN(deck,discard,n){
  let d=[...deck],disc=[...discard],drawn=[];
  for(let i=0;i<n;i++){
    if(d.length===0){d=shuffle(disc);disc=[];}
    if(d.length>0)drawn.push(d.shift());
  }
  return{drawn,deck:d,discard:disc};
}

function zonesMatch(a,b){return a==="Wild"||b==="Wild"||a===b;}
function adjacent(a,b){return Math.abs(a-b)===1;}
function atGap(a,b){return Math.abs(a-b)===2;}
// Returns the new position after moving, ensuring it stays on the track and never
// lands on the blocked space (the opponent's position).
function safeMove(from, dir, blockedPos) {
  const raw = from + dir;
  const clamped = Math.max(1, Math.min(10, raw));
  // If the destination is the opponent's space, stop one short
  if (clamped === blockedPos) return from;
  return clamped;
}

// --- AI LOGIC ---
function aiPickCard(hand,mode,attackCard){
  if(!hand.length)return null;
  if(mode==="attack"){
    // Occasionally play a persona attack card if available (30% chance)
    const personaAtk=hand.filter(c=>c.type==="Persona"&&c.attack>0&&c.zone!=="—");
    if(personaAtk.length&&Math.random()<0.3){
      return personaAtk[Math.floor(Math.random()*personaAtk.length)];
    }
    const atk=hand.filter(c=>c.attack>0&&c.type!=="Persona");
    const pool=atk.length?atk:hand.filter(c=>c.attack>0);
    if(!pool.length)return hand[0];
    return pool.reduce((b,c)=>c.attack>b.attack?c:b,pool[0]);
  }
  if(mode==="parry"&&attackCard){
    const matching=hand.filter(c=>zonesMatch(c.zone,attackCard.zone)&&c.defence>=attackCard.attack);
    if(matching.length)return matching.reduce((b,c)=>c.defence<b.defence?c:b,matching[0]);
    return hand.reduce((b,c)=>c.defence>b.defence?c:b,hand[0]);
  }
  // effect mode — pick a usable persona effect card if available
  if(mode==="effect"){
    const fx=hand.filter(c=>c.type==="Persona"&&(c.zone==="—"||c.attack===0));
    return fx.length?fx[0]:null;
  }
  return hand[0];
}

// --- DESIGN TOKENS ---
const T={
  ink:"#0E0806",bgDark:"#130C05",bgMid:"#1E1208",bgCard:"#241408",
  walnut:"#3A2510",walnutMid:"#5C3317",gold:"#C8A96A",goldDim:"#7A5C3A",
  parchment:"#F2E8D5",cream:"#C8B89A",
  red:"#C43030",redDim:"#8B1A1A",blue:"#5A9EC0",blueDim:"#2A4A6A",
  green:"#5A9A5A",purple:"#8A6ABA",amber:"#C07A30",
};

const SUIT_STYLE={
  Brutal:{bg:"#2A1208",text:T.red,border:"#6A1A0A"},
  Elegant:{bg:"#081A10",text:T.green,border:"#0A4A20"},
  Daring:{bg:"#1A1A08",text:T.amber,border:"#4A4A0A"},
  Improvised:{bg:"#141408",text:"#9A9A40",border:"#3A3A10"},
};
const ZONE_STYLE={
  High:{bg:"#10181A",text:T.blue,border:"#1A3A4A"},
  Low:{bg:"#0A1018",text:"#6A9AB8",border:"#0A2030"},
  Wild:{bg:"#180A18",text:T.purple,border:"#3A1A3A"},
};

// --- SUBCOMPONENTS ---
function Badge({label,style}){
  const s=style||{bg:"#222",text:"#aaa",border:"#444"};
  const icon = SUIT_ICONS && SUIT_ICONS[label];
  return (
    <span style={{background:s.bg,color:s.text,border:`1px solid ${s.border}`,borderRadius:2,padding:"0 5px",fontSize:9,fontWeight:700,letterSpacing:.5,textTransform:"uppercase",fontFamily:"monospace",display:"inline-flex",alignItems:"center",gap:2}}>
      {icon && <img src={icon} style={{width:10,height:10,objectFit:"contain",opacity:.85}} alt=""/>}
      {label}
    </span>
  );
}

function CardTile({card,selected,onClick,disabled,faceDown,small}){
  const w=small?68:80,h=small?96:112;
  if(faceDown)return(
    <div style={{width:w,height:h,borderRadius:5,border:`1px solid ${T.walnut}`,background:`repeating-linear-gradient(45deg,${T.bgDark},${T.bgDark} 3px,${T.bgMid} 3px,${T.bgMid} 6px)`,flexShrink:0,opacity:.7}}/>
  );
  const suitS=SUIT_STYLE[card.suit]||{bg:T.bgCard,text:T.cream,border:T.walnut};
  const zoneS=ZONE_STYLE[card.zone]||{bg:T.bgCard,text:T.cream,border:T.walnut};
  const isPersona=card.type==="Persona";
  return(
    <div onClick={disabled?null:onClick} style={{
      width:w,height:h,borderRadius:5,flexShrink:0,
      border:`${selected?"2px":"1px"} solid ${selected?T.gold:T.walnut}`,
      background:selected?`linear-gradient(160deg,#3A2814,${T.bgCard})`:`linear-gradient(160deg,#281608,${T.bgDark})`,
      cursor:disabled?"default":"pointer",
      display:"flex",flexDirection:"column",padding:"5px 4px",gap:2,
      boxShadow:selected?`0 0 12px ${T.gold}55`:"0 2px 6px #0009",
      transform:selected?"translateY(-5px)":"none",
      transition:"all .15s ease",opacity:disabled?0.45:1,
      position:"relative",
    }}>
      {isPersona&&<div style={{position:"absolute",top:2,right:3,fontSize:8,color:T.gold}}>★</div>}
      <div style={{fontSize:8,color:isPersona?T.gold:T.cream,fontFamily:"Georgia,serif",lineHeight:1.2,fontWeight:700,paddingRight:isPersona?10:0}}>
        {card.name}
      </div>
      <div style={{display:"flex",gap:2,flexWrap:"wrap"}}>
        {card.zone!=="—"&&<Badge label={card.zone} style={zoneS}/>}
        {card.suit&&<Badge label={card.suit} style={suitS}/>}
      </div>
      {isPersona&&card.effect?(
        <div style={{fontSize:7,color:T.goldDim,lineHeight:1.3,marginTop:2,flex:1,overflow:"hidden"}}>{card.effect}</div>
      ):(
        <>
        {card.flavour && (
          <div style={{fontSize:7,color:"#5A4030",fontStyle:"italic",lineHeight:1.3,overflow:"hidden",maxHeight:24,marginTop:2}}>
            {card.flavour.slice(0,50)}{card.flavour.length>50?"...":""}
          </div>
        )}
        <div style={{marginTop:"auto",display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:16,fontWeight:700,color:T.red,lineHeight:1}}>{card.attack}</div>
            <div style={{fontSize:7,color:"#666",letterSpacing:.5}}>ATK</div>
          </div>
          <div style={{width:1,height:22,background:T.walnut}}/>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:16,fontWeight:700,color:T.blue,lineHeight:1}}>{card.defence===99?"∞":card.defence}</div>
            <div style={{fontSize:7,color:"#666",letterSpacing:.5}}>DEF</div>
          </div>
        </div>
        </>
      )}
    </div>
  );
}

function DuelTrack({playerPos,aiPos}){
  const spaces=Array.from({length:10},(_,i)=>i+1);
  return(
    <div style={{background:`linear-gradient(180deg,#3A2510,#221408)`,border:`2px solid ${T.walnut}`,borderRadius:6,padding:"8px 10px",boxShadow:"inset 0 2px 10px #0007"}}>
      <div style={{fontSize:8,color:T.goldDim,letterSpacing:3,textTransform:"uppercase",textAlign:"center",marginBottom:6}}>— Duel Track —</div>
      <div style={{display:"flex",gap:3,justifyContent:"center"}}>
        {spaces.map(s=>{
          const isNeutral=s===5||s===6;
          const hasP=playerPos===s,hasA=aiPos===s;
          return(
            <div key={s} style={{width:42,height:44,borderRadius:3,
              background:isNeutral?"#3A2818":s<5?"#0E1E10":"#1E0E0E",
              border:`1px solid ${isNeutral?T.goldDim:s<5?"#1A3A1A":"#3A1A1A"}`,
              display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
              position:"relative",gap:1}}>
              <div style={{fontSize:7,color:"#ffffff22",position:"absolute",top:2,left:0,right:0,textAlign:"center"}}>{s}</div>
              {hasA&&<div style={{width:18,height:18,borderRadius:"50%",background:T.redDim,border:`2px solid ${T.red}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:"#fff"}}>⚔</div>}
              {hasP&&<div style={{width:18,height:18,borderRadius:"50%",background:T.blueDim,border:`2px solid ${T.blue}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:"#fff"}}>🛡</div>}
            </div>
          );
        })}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",marginTop:4,fontSize:7,color:"#55331122",fontStyle:"italic"}}>
        <span>← Opponent territory</span><span>Player territory →</span>
      </div>
    </div>
  );
}

function BravadoBar({current,max,label,color,portrait}){
  const pct=Math.max(0,current/max*100);
  return(
    <div style={{flex:1,minWidth:0,display:"flex",gap:8,alignItems:"center"}}>
      {portrait && (
        <div style={{width:44,height:44,borderRadius:4,flexShrink:0,
          backgroundImage:`url(${portrait})`,backgroundSize:"cover",backgroundPosition:"center top",
          border:`1px solid ${color}55`,boxShadow:`0 0 8px ${color}33`}}/>
      )}
      <div style={{flex:1,minWidth:0}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
          <span style={{fontSize:9,color:T.gold,fontFamily:"Georgia,serif",letterSpacing:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{label}</span>
          <span style={{fontSize:11,fontWeight:700,color,fontFamily:"Georgia,serif",flexShrink:0}}>{current}/{max}</span>
        </div>
        <div style={{height:8,background:"#0E0806",borderRadius:4,border:`1px solid ${T.walnut}`,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${color}66,${color})`,borderRadius:4,transition:"width .4s ease"}}/>
        </div>
      </div>
    </div>
  );
}

function Log({entries}){
  const ref=useRef();
  useEffect(()=>{if(ref.current)ref.current.scrollTop=ref.current.scrollHeight;},[entries]);
  return(
    <div ref={ref} style={{background:"#080502",border:`1px solid ${T.walnut}`,borderRadius:4,padding:"6px 8px",height:110,overflowY:"auto",fontFamily:"monospace",fontSize:10}}>
      {!entries.length&&<div style={{color:"#3A2510",fontStyle:"italic"}}>The duel has not yet begun…</div>}
      {entries.map((e,i)=>(
        <div key={i} style={{color:e.t==="hit"?T.red:e.t==="parry"?T.blue:e.t==="gold"?T.gold:T.goldDim,marginBottom:1,lineHeight:1.4}}>
          {e.text}
        </div>
      ))}
    </div>
  );
}

function Btn({label,onClick,disabled,color,small}){
  const[hov,setHov]=useState(false);
  return(
    <button onClick={disabled?null:onClick}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        background:disabled?"#0E0806":hov?"#2B1A0E":"#160E04",
        border:`1px solid ${disabled?T.bgMid:hov?color:T.walnut}`,
        color:disabled?"#3A2510":color||T.gold,
        padding:small?"4px 10px":"6px 14px",borderRadius:3,cursor:disabled?"default":"pointer",
        fontFamily:"Georgia,serif",fontSize:small?10:11,letterSpacing:.5,
        transition:"all .1s",flexShrink:0,
      }}>{label}</button>
  );
}

// --- PERSONA SELECTOR ---
// --- AI PERSONA CARD PANEL (persistent — player must dismiss) ---
function AiPersonaPanel({event, onDismiss}) {
  if (!event) return null;
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 200, background: "rgba(0,0,0,0.7)",
    }}>
      <div style={{
        background: "linear-gradient(160deg, #1E1208, #0E0806)",
        border: "2px solid #C43030",
        borderRadius: 8, maxWidth: 380, width: "88%",
        boxShadow: "0 8px 40px #000C, 0 0 30px #C4303033",
        overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #3A0808, #1E0404)",
          borderBottom: "1px solid #C4303055",
          padding: "10px 16px 8px 16px",
          display: "flex", justifyContent: "space-between", alignItems: "baseline",
        }}>
          <div style={{fontFamily: "Georgia,serif", fontSize: 15, fontWeight: 700, color: "#E87070", letterSpacing: 1}}>
            {event.name}
          </div>
          <div style={{fontSize: 8, fontWeight: 700, letterSpacing: 2, color: "#C43030", textTransform: "uppercase"}}>
            OPPONENT PERSONA CARD
          </div>
        </div>

        {/* Actor + zone */}
        <div style={{padding: "8px 16px 0 16px", fontSize: 10, color: "#7A5050", fontStyle: "italic"}}>
          {event.actor} plays — zone: {event.zone} — ATK {event.attack}
        </div>

        {/* Effect */}
        <div style={{
          padding: "8px 16px 0 16px",
          fontSize: 12, color: "#E8D0B0", lineHeight: 1.6, fontFamily: "Georgia,serif",
        }}>
          {event.effect}
        </div>

        {/* Flavour */}
        {event.flavour && (
          <div style={{
            margin: "10px 16px 0 16px", padding: "8px 10px",
            background: "#0E0806", borderLeft: "2px solid #C4303044",
            fontSize: 10, color: "#7A5050", fontStyle: "italic", lineHeight: 1.5,
          }}>
            {"“"}{event.flavour}{"”"}
          </div>
        )}

        {/* Dismiss */}
        <div style={{padding: "14px 16px 16px 16px", textAlign: "center"}}>
          <button onClick={onDismiss} style={{
            background: "#2A0808", border: "1px solid #C43030",
            color: "#E87070", padding: "8px 28px", borderRadius: 4,
            cursor: "pointer", fontFamily: "Georgia,serif", fontSize: 12, letterSpacing: 1,
          }}>
            Understood — select your parry
          </button>
        </div>
      </div>
    </div>
  );
}

// --- CARD EVENT PANEL ---
function CardEventPanel({event, onDone}) {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!event) return;
    setVisible(true);
    setFading(false);
    const fadeTimer = setTimeout(() => setFading(true), 3200);
    const doneTimer = setTimeout(() => { setVisible(false); onDone(); }, 3800);
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer); };
  }, [event]);

  if (!event || !visible) return null;

  const isSignature = event.isSignature;
  const borderColor = isSignature ? "#9B6ADA" : "#C8A96A";
  const headerBg = isSignature ? "linear-gradient(135deg, #2A1A4A, #1A0E2E)" : "linear-gradient(135deg, #3A2510, #221408)";
  const accentColor = isSignature ? "#C8A0FF" : "#C8A96A";
  const tagText = isSignature ? "SIGNATURE MOVE" : "PERSONA CARD";
  const tagColor = isSignature ? "#9B6ADA" : "#C8A96A";

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 100, pointerEvents: "none",
    }}>
      <div style={{
        background: "linear-gradient(160deg, #1E1208, #0E0806)",
        border: "2px solid " + borderColor,
        borderRadius: 8,
        padding: "0 0 16px 0",
        maxWidth: 380,
        width: "88%",
        boxShadow: "0 8px 40px #000C, 0 0 30px " + borderColor + "33",
        opacity: fading ? 0 : 1,
        transform: fading ? "translateY(-8px) scale(0.97)" : "translateY(0) scale(1)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        pointerEvents: "none",
        overflow: "hidden",
      }}>
        {/* Header bar */}
        <div style={{
          background: headerBg,
          borderBottom: "1px solid " + borderColor + "55",
          padding: "10px 16px 8px 16px",
          display: "flex", justifyContent: "space-between", alignItems: "baseline",
        }}>
          <div style={{
            fontFamily: "Georgia, serif", fontSize: 15, fontWeight: 700,
            color: accentColor, letterSpacing: 1,
          }}>{event.name}</div>
          <div style={{
            fontSize: 8, fontWeight: 700, letterSpacing: 2,
            color: tagColor, textTransform: "uppercase", opacity: 0.8,
          }}>{tagText}</div>
        </div>

        {/* Actor line */}
        <div style={{
          padding: "8px 16px 0 16px",
          fontSize: 10, color: "#7A6050", fontStyle: "italic", letterSpacing: 1,
        }}>
          {event.actor} plays:
        </div>

        {/* Effect text */}
        <div style={{
          padding: "8px 16px 0 16px",
          fontSize: 12, color: "#E8D8B0", lineHeight: 1.6,
          fontFamily: "Georgia, serif",
        }}>
          {event.effect}
        </div>

        {/* Flavour text */}
        {event.flavour && (
          <div style={{
            margin: "10px 16px 0 16px",
            padding: "8px 10px",
            background: "#0E0806",
            borderLeft: "2px solid " + borderColor + "44",
            fontSize: 10, color: "#7A6050", fontStyle: "italic", lineHeight: 1.5,
          }}>
            {"“"}{event.flavour}{"”"}
          </div>
        )}
      </div>
    </div>
  );
}

function PersonaSelector({onSelect}){
  const[hov,setHov]=useState(null);
  return(
    <div style={{minHeight:"100vh",background:T.bgDark,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{fontFamily:"Georgia,serif",fontSize:26,color:T.gold,letterSpacing:5,marginBottom:4,textAlign:"center"}}>THE FLASHING BLADE</div>
      <div style={{fontSize:10,color:T.walnut,letterSpacing:5,marginBottom:8,textTransform:"uppercase"}}>v2.2 · Card Data Loaded</div>
      <div style={{fontSize:11,color:T.goldDim,marginBottom:24,fontFamily:"Georgia,serif",fontStyle:"italic"}}>Choose your persona — then cross swords with the AI.</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,maxWidth:600}}>
        {PERSONAS.map(p=>(
          <div key={p.id} onMouseEnter={()=>setHov(p.id)} onMouseLeave={()=>setHov(null)} onClick={()=>onSelect(p)}
            style={{background:hov===p.id?"#2B1A0E":T.bgMid,border:`1px solid ${hov===p.id?T.gold:T.walnut}`,borderRadius:5,padding:0,cursor:"pointer",transition:"all .15s",textAlign:"center",overflow:"hidden"}}>
            {PERSONA_PORTRAITS[p.id] && (
              <div style={{width:"100%",aspectRatio:"3/4",backgroundImage:`url(${PERSONA_PORTRAITS[p.id]})`,backgroundSize:"cover",backgroundPosition:"center top"}}/>
            )}
            <div style={{padding:"6px 6px 8px 6px"}}>
              <div style={{fontSize:10,color:T.gold,fontFamily:"Georgia,serif",fontWeight:700,lineHeight:1.3,marginBottom:2}}>{p.name}</div>
              <div style={{fontSize:8,color:T.blue}}>♥ {p.startBravado} Bravado</div>
              <div style={{fontSize:7,color:T.goldDim,marginTop:1,fontStyle:"italic"}}>{(SIGNATURES[p.id]||{}).name}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop:16,fontSize:9,color:T.walnut,fontStyle:"italic",textAlign:"center"}}>
        60 core/wild cards · 3 persona starters · Signature moves active<br/>
        Location & Object cards, Remise, Riposte, Flourish: coming next
      </div>
    </div>
  );
}

const PERSONA_PORTRAITS = {
  gallant_captain: "data:image/jpeg;base64,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",
  acrobat: "data:image/jpeg;base64,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",
  foppish_noble: "data:image/jpeg;base64,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",
  tavern_brawler: "data:image/jpeg;base64,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",
  highwayman: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCAEOALQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD0ikzSZpCa8s6RSaaTQTTSaQATTSaC1NJpDA00mgmmk1IxSaikalZqqzyYHWgBzOPemFxVGW6CnG6o1uQe9WkSXmemM496rmb3qnd6hFB998VSQrmiZB705ZB71y0viBcr5a7lJwMNy30H+NLD4hjB/fxTRY7lcr+dVyMXMdhE4q5G1YdpdLIqsrZBGQR3rTgkz3qGijQU1KDVZGqZTQBMDTqjBpwNMQ6ikzRQBETTC3vSsagZ8HrUjJS3vTS3vUXme9IX96Bkm73pC3vUe/3o3e9SwHFvekJ96Td70hNSUMkb3rOvZSqnmr0hrNvhlDTQM8y8X+Ib+31ERWlw0SLnO0dSOuat+GfFbXjeReELKBkP0Df/AF6y/Floovp0lztc+YjL1XPX6/SsfSrR4pHeJklJGFZcEr+B5Br0FGLgkczbUj0ttetUJDSnA/ixxXI65rQaQ87syEjBzlew+hrM1H7RHbiGKKTLffc/KB+JrIS1AO6a6iUei5c/px+tOFJJ6CcmbkWsXEi7vNZCM4KqB+GetWW1tmJDO67iAM9cY6/nWJZmxGVklmyeN20Y/KrN7Y+TBDPCwljPBdemabSvqCvY6/w9qs0cywNKXAAwhOePb/Cu/spSyg5rxbTTJJPGqEiZf9WQcE+1er+Hbn7TZQyHgkYYehHWuerG2ppB3OliarCmqsPSrKVgWTA04GmCnimAtFFFMCrI2BWdc3IjblsVel6GuC8ZWepvqNteWW6SKFSDCGxknPP8vyogk3ZieiOrW6BPBqUTA968ytvFlzbttu4JQM43cMPzFbtp4ptJ8ASDPoDz+R5q5U30EpHYecPWlWXPeudGrwOPllGcZweDSaPq4uo4/MZRK+47R6A1m4OxSkjp1fNOzVSKTIFTBqyZYOap3IyDVpjVWc0IDifGGnRTW7TswjeIEhj0x6GvP7K0jugxMwDgnC7sEj2rvvHgc2JKhmXoQozXP+FLfTJtMFzeR4lguDku2F6ZXP5V1Qk1TuSopzsY17pYjYKLyMt1CO4JFZU2YnaOTkrxxXcWWiWMlm14z7MswJj9fbnHeuT1qCNbuSSDcYT37itadXW1xVaVlexThdQ2eGHp0rb0G6An+zS4NvKRwf4T2NZFrZvcnbArO/dAMn612Ph3wlO7JLdfux1xjkVpOUbamEU7jm0mS31bdCpWMMu0gccnpXo2kWot4yq9Cxb6ZNQR6ejtEWGRGdwHvWvbxbcVxyndGyjYuQjirKVBGKnUVmUSinCminCmhC0UuKKYFR1yO9Zt5biQEEGthlqCSMGoKOCvfCGmzmQm3Ks53EqxHPrXNal4NuoAWsZ/MA/5ZzD+Rr1iSEVTuLdSDVKpJByo8Vnvb3TrkQ3MJVhj5XJ5H+FXdK8RSRa4ryLiGUBCMfcz3GPwra8b2EkNzFfRqsgVSrRsOgznOa420u1srmS7kgWVypKAcBDn0rpjJSjoZuOt2ev6dqcVxkI2SvBB4IrUSYGvE9D1ue0vnuWbc8/DFue+c13Np4lAOLlQi93BOB9a550mmaRkmdk8wArOu7+KPO91Ue5xWBqfiWJLdxblnmx8o2kc/jXDy3uoSSmWV45D1MbAgn6GnTpN7ilK2x1Hiy9hntSEuVyD8yq/Ud64+0YQ3LWsn7y2LCVIwwAYnofepnKXLCSJiQfvI3JU1nT288avG4yqAvE+MFeeRXVGCSsZczvc23vDZKbf7URbsfmgAzj6Ed6xNSdpNucqHGdvoO1W9IS0lJa48046Fefz96TWniSI/Z1ZRIQuXILEDnt0HSnGFpDlU5oj/CsBOpwph1Jbl16gYr16xjAQDFeV+G5pYGjaI7pXOFQD7w716ppz7kXPWsMRuOnsasK8Dirca+1V4cYFW465zQlQVKopiiplFMQop4oApwpoQlFOopgMIqNlqwajYVLGVXSq8sfBq8wqGRallI5TxHpzXlqyJtDZBGf1H4145d20kUkuYsRpIy7yc8g9K+gLmIMDXE+IPCllciaaOLbMwJGGIUt6kdKulNReoSV0eTgGMhcHPXmtOHUJfkBYcryP72eMVFf2xhb/AGycMp6qR2NVCrRRkj7xGBx0rs+Ix2NO01GU2RjyW2rkBjwMdv5U06ks0JRNvzADBHI981iHeFwM80iFlzt/Oq5ETzs0z5c9tNIPllVgQwPOOlNhhuyC8s7+SFycsTn2pml4ZmRl3BuMVqreQXCi1kUpJHlU/hVx249altrQpJPUp6BCk9+8RLKVy+5TggAVptZx6pBci43LcW6/IwOdwwOTWVpd4un6ncu8RcMu0YPI5Hr9K6DTL+G71GTy4mjURMrhsdMEg1TZBy8qzwTo8bFTENuAeUI612fh7xVLE0cN8mVYgCUH+dcrrF1EL7zLZt/G1/Q0RHfGrxnCNyP9k+lEoqSsxJ21R7pZTCRFYHIPetKKuH8G6qLuxjViPMjG1h/Kuzt5MgVwyjyux0J3ReSpVqFDUymkBIKcKaDThVIQUUuaKYhxppp5pjVIyNqhepmqJ6llFaQVQuIgwOa0JKqzEVNh3OX1XRLO6cSTwIzL0bHNcB4we3gUw2saDA8vIHSvQfEuprZ27BG/esDtH9a8k16ZpLtY2OSq5Y57muvDwbd2ZVJaWMtgT154qPk5AqWT5YyRnnioRwa7DA0tJjLMNv3uvWrMkBnDtnDK2QaraehClgcHqK0Ig3kbdxBLZyp5zXPJ+9c3jsZvktJqOwfeIBz74qwiSsZIlyEyBLjpgHv7U23LzanLJGpOCTgegqXUJX2mFBhZCDJ65HA/DmtLaIzvq0UJlDXDBehzj8Kba3XkTsQMxMcMtOkJjkiZgQc/pVdk2SFarcnY7HwzfizvI5FbMTdSD1H/ANavWdPuA6KQcg14Dp90bWQZ+7nP0r1DwjrSSRRwseP+WZzkY9K560L6o0hLoeiRPnvVlTWbbS5A5q9G2a5TQsA08GolNSCqQDs0UlFMRIaa1ONMY1IyNqhc1I7VWmkwDSGRStisnU72O2t5JZGwqjJp+p6hHbRM8j4UV5vrusz38rRH5R/c9B/jVwp8wpSsR3l3JqVxNcTH5QeAfTsK4y5Y3N3NKOhbAroNQnFvpZxwz/KPeubiJzj3zXdFWWhg9RLwASiNei4FQSDbg+9TFclm689ajn6Yq0Sy1bSeXIpBJQjpVu4d413KwCIC2R3J6CqNsFLqrgYPQmrGoQtHBtAbZuGSAcdPWsH8VjdfDcj05JSryxoX28tjqKs3jSPGD5DDcvzbhg47GoraDaFjViGcgBh1Ga0dS+yh5lSJ1WNjGCZXJYA+5qnURn7NmBKxdSWYs46knNDtmcE98ZqS6iWJ3CqcZx14qFuWTHdcVSEyaRWbAVDxxn1q5pN/LZPkMSgOSM8j3FR2qCVRn526Dd/QUPavGX3KR3pcy2YWe6PXPCviKO9iSNny+OD/AHv/AK9djbzBgMGvnrRtSfT7jO5hGT27H1r1rwzry3cKiWQeZ/Metc9WlbVGkZXO3RqmU1QgmDAVbR6xLJs0U0GimInNRvUhNQueKljIJWxWXf3SxRszNgAZJParl3IEUkmvPfE+smZJAjkQqcDaOWNOMXJg3YyNf1aS/uTgt5Q+4vr71jxRhpN20+hNONypQkKwbGBmobi5NtZvIg56Ln1rsirKxi3cytYuPPvNoJKRAqB71XaMRRFv4jTWVt4LckkEmpJwSoGOprQkhI2xD3qOOJpZAMZ9B61M5CyAE8YwPrV3R4EeZ5ZMhI1J47mlKQ0upHHYiO6l80ssELYY9Nx9BRdavNPFNbqo8hgAEzwuOhqTWL1tRuHMQwWw0i92wAM/p0qlYxebOcDPB2j6VKWt2U3pYfa3DwywySJlVcfd68HNSzXEUpY+cGBctjngemKtpEpnBAG2JevqT1NZVv8AvpZum4/Mo+ho5VuLnYs00UjSbskZyKqsD5cbD1IqzNCuckYyOcdqhQZjZDjKMCP5VVrCvcv6WyxzKD1YYJ960Ly3AjQg8tk81iI5V+nUfrW/JdyXlkgSBNg4UtyQe59qwmmnc3g01YwkUbiMdDiuk8N3LxfLyWjOceq96xYowlw6sCD6GrdgzwTrImeDz7itr3RhazPW/D2rrdRBWcl1HcYJFdPBJuA5rx6wvZLS5EsTnAPUDtXp2i3gurdJFbII7VyVI2dzWLubgPFFMU8UVBRdNRSdOtSmonpMZh+II5pLGVYMlyOg6kd8V5Bdrc/aJI3LnDZwScV7fcLkGuW13TLOVZZp0UNswZMcgCrpz5SZRueWXJMcuzvjJzVPUJw4SIdFOTVm/IExkAwMYHvWScs/zZ5rsRiyaAqxbg8/pRc7RLtXlQOtSxKscYGevPPWoChkchepbFNAV0hN1NgcKOpPQCp7m6VFWK2GEQEL756k02aRYk8mLnJ5Pqf8KktrMFkMgJzyR7Vm3fVmi00RUV2t4S+AJDnax6nPX9Kv6Nd2kQ2Mdrn+JuB9KpXjG5u2KjKp8qimSRqqbQuW9RV9NTPqal/OIrN2hYYlO0H19x7VmWnyXULdAeD+NVyMD5uPY0/GVBPXtTtoBbuisWd3r+dVVbfcbsYB4NOMe5dzkk/XJqLGwkY5p7i2Lkag9R2q+s62ZhQfdIycdaqW+GRWz1ODUzwvG4YjevAUntUSVy4Ow+9dPtCumQx6g9qliP8AOqqRmZmlkyBnpitC32m3KEfNuyD7UR0QSd2dBpOmXN3bRzQxZXsc4zXfeGbOS0tyr7gC2Qp7Vz/gWcy2HkuRmJsD6Hn/ABrubZcAc1zVJO9i4rqW16daKcOlFZFFw1E9Smo2FAFWYcVzHjHzE0W6aIAsF6e2RmuqkXiqF3brKjI6gqRggjOaSdncZ4HdLK5y+T7dhUUFsZJFGPlBGe1eoav4Ut5ZC8BMWeqjpiuH1G0/s28lgVgwTp+Wa7ITUtjGSaMychpCAoAUYGKqXEnkRsg++3B9hVtd2wufvZzk1RmTDO59gM1TXQExllAZpRv/AMir93L5UMjLwfuj6moYgI4dx+8wqGfM11HDzx8zfU//AFqndl7IfbxbYVCqMmq1zIF+RMZ7n1q5cviMInB/iOP0rNnAU4zlu9XHUzZByW55qzbMina6kg9x2qIphQakjIYgN+Bq3sSjSSFQhKkMrDqKzbhCjr3HSr9tlD8oOCOQarXS/eUk4HSojoynqh1jw20/hWlBKUBVuRWNCxUqe9a8K71LDuM1TEOGXcY656VtjSbhYoyYW+bsFzis/S4ma6jCjLBgR+deuWkAKqcCsak+UuMbmT4Q0ZrCDfKf3j9Vx92uxgXAHSoIIsdhV2NcVzN3dzS1h4HFFOAopAWDTWpxppoAicVXkWrTConFSMzbmLcp4rzHxJo17Bc3N04DRvMcMOeD/L0r1eRc1QuYFdWDKCD1BFVCfIwcbnil1bPDEu5GCt0Yjg/jWYw8+UIOldj48Mq3ZhCFYokGxQOOep/p+FclDEVjMnviupT5lcz5bOxISiq0sgBVBn/61VNOSR5jcMBtJySe/NNv5vkWEdXO4+w7Vb08xpZ7WbaTk/Q/4U7WiDd2Q6xJGJdsPBPLAdqzo03Ek9BU9xIssuIgcngE/wA6mjgwWUdAMfjVx0REtWRvHhY+P4agePbIVxweRW3qdg9n5AcD95EGrPu4zsLqM4/SmncVh9swVWDY3EcE9qjulO3J78U+CUqFLrkcYI6//Xqa8wwIGCMA1N9SrFGFQy11fgu3juZ5IpSOFOPeuYs03JjueBWz4fu2stThc8DOGHtRPZ2CO56JpPhu1tJ/NXcxzwCc4rq4I8AcVS08iSJWXkEAg1qxLxXE5N7m1rEsS1YUUxBUyigQtFLiigCWmmnUhoAY1RsKlNMakxldxVaRM1cYVC61LKRiajYwzgGWJHx03LnFeRarbSWt5NDKgjAYnaOmM9q9suV+U15D4vuzeay6D/Ux5jX3x1/WrpNpg0cd5Uss7yIuWBzj2pXuCV2bQp6FRxWzbQ7UcqgMisSFPeqEs8gVt5HPqOa6VUu9jNwsix4a0g6tduiyLGyLuAI5PaulTwhex3UaYDwlhlw3Qd+Km+GdgZJLi8cA9I1P6n+lelx24x0rOpValZCjBWOR1PwtFfPG7yMoRAoAANcZ4t0hdKWJY5MrI54PUD3/ADr2GSLCnivIvHM8t1rUkZQiOD92v+NKnOV7FOKOetYJ03MBlB0IGQKjl80k5Vsep4FWoEZVOOc981VJd2KyEhR2rWMm2KUUkdd4O0O21KzeSYt8rbVVeMHGcn1rVufBkyyBrSQNk/xcY/GnfDVkazmhA+ZXDE+oI/8ArV6DHF0rCc5KTKSVijoNpNbafBDckGVECsR0OK3Il4qKNMVZQVmMkQVIBTVFSCqJCilopgPppp1IaQDTTGp5prUhkRFMYVIaaRSsMpzplTXk/wARLeHTL+CaNCftDM8ig9MYGR9c16/IvFeXfFWNGvLRd+cRHcgHK5PBz74/Sqgve1HfQ5H7VazJGLU7cn5tx5FZk8ZafyyVJU9jwahvoBFcFcY/Gu5+FHhuDUL641G8iWSG2wkaOMhnPOfwH866IxUdUZyk3oze+GNnPHp05lhZYmlDRuwxu45x+ld2seKkUKowAABwBRuUemawkru5SZG8eR0FeffE3TPK08albQ5mVwsjL/dOevr2r0gYwDXPePUJ8J6lsQufLHAHQbhk/gKcY2dwbPFI9UieILLCyuP4o+5qJCl3PsiDF5CFHGOvSovKj2cjOehFdH8PrKK68SWscgGxMygH+IqMj9a3tFaoluT0Z6P4U8Nx6HbGNXaR3272b1ArpUTFLGgA7cU/IzjiuZpt3ZSY5RUq1EDT1NSMmWpBUa1IKoQtFLRTEFBopDSAQ0xqcaYxpDGk00mop5SgyAT9KrG8Qf6w49qqwFpznivIfiFdeb4pItCJfKiRJE7bucge+CK9HudUXdiORa8f12UXOvX09vIwjkkJPyFgx7/TmrjZgY2o7Gc4J3A8K3Ue1e4eGYYNK8PWkcKhd0Su3+0xAJNeI6Yhu9XtoxCikSBnBHykA5IxXrTatlwnksIwPlOQAB6YqqjskiVq7m6+ogAFV/EmnS3sQj8wk/THNcbJqCrKd0hZuuARx/hVe41MEEhzg8bV5qNR6HbLrETALuGfeqfijUceHNRa3mjWTySAxPrwfxxXJxal5akiRoz3zg1ma/ftdaXKgfLEjcRxkZppMWhx9tErY2ZLE/dBxius+G0tvF4iKzqryeWTEwbhCOv1yM1zEYjTa2N2RyP8auhJEK3Vu/lyDoy/Lj6VrJgke6fa0HofxqJLyNpCGYAnjk15raeJpp4IhNKVkxggcZPetC01dt+TJICTg471lyyHdHoSXEZOAwJHbNWY2zXHWl4ZWDbiTjjcMH8K6ixl82NWBz2zWbGjSQ8VKKhjqUUIB1FFFAgpCaKQmgYhNRuaeTUUpwDQBSvHOOASTwAOpqo2k3kpDOY4gRja3Jrc0uJXeSVuSmFX29atzLwTj6VqoXV2S5a2PPfEtv8A2RYyXMlwHm+5FGE+8/Yf1rziZ5rWxO44dmyRkAnPXiu3+JV08d/ZKVYxhHOVGTuyK8/v7hZFZRE6hh0cf1pJa6FX0KGmzNHqYdOHUsfpn/8AXXQ/bZ5WJ3nk4GD0qloWhy3ztMGCIcAFh1A9K66z8OzQsEUxMMcnPP8AKrnKKJSbMcRSsmShbceW71YSynZc7D7fLwK6m30q4jYJGgIHOQcZrSi0yWRcspj9QetY87Zdkji5dGLwiaWToPuhQDVO40oFGRWLhhyOld3LoyAsXZeeeRmootLgVsDoemTijmYWR5rL4aubgLHHIirnqykHFV5LC40mUxTRiRMfKxztI/xr1xdD3MFztHfkU/8A4Rss2BLlfTZk01OT0FZbnjqtAIGZolMuc/M4UV03gvS5tSid2ZQQ2E3AkH6Gu8tvDCf8tLeLb6tGMmt/TtJitsbAVPoFGKpXelhOxy9vo8lm+J41QkdQPvfQ1uWaBEAXge1a+rQCTTpsD5kQup9COax7J9yKfUVM48rCLuaUdSioUNSioGPopKKYhM0hNGaaxpDEJqGZvlNSMarzn5TRcC7oZDQTn/prj9BV91BFclYa2mlX0sV3u+zzYIYDO1hx/Kuii1bT5k3JewY93A/nXTBpxM5LUzdb8N2OroFvoUkCnK5yCv0xXPJ8PNFjYlbZn5yA8hOK7Q6hZH/l8t/+/q/40n2+x/5+7f8A7+L/AI0nFDuzIttAtoMBI41A6YXpV2HS0i5UKW9SOatG/sR1vLf/AL+r/jR/aNj/AM/lv/39X/GjliF2QJYYfOEA/wB2p1tACMkEDsRxS/2lYjreW/8A39X/ABpRqNj/AM/lv/39X/GmooV2DWcTdY0I/wB2oRpkAbIRAfpU/wDaNj/z+W//AH9X/Gl/tGy/5+7f/v6v+NPliF2CWqDtUwiAGBx9KhGo2X/P3b/9/V/xpRqNl/z9wf8Afxf8aaSFqS+UtOVAOlQ/2hZjrd2//fxf8aRtSsUGWvLcD3lX/GnoIkvgPsNxnp5T/wDoJrldMfMS/QVL4i8T2zW72WnSCaWYbGdfuqD1+tVdNBWNQawrNNqxpBG3GeKmU1VjPFTqayKJQaKTNFMBKa1OprUgImqCXkVYaoZKkZj6hZpcKVdQRWLJpBB+SVwPTOa6eYVVdRmlzNDsc+dKf/no36U06W//AD0b9K3topCozS52OyMH+y3/AOejfpR/Zj/89Grd2ijaKOdhZGF/Zj/89Gpf7Mf/AJ6NW3tFG0Uc7CyMT+zH/wCejfpSHTH/AL5/St3aKNoo52FkYX9myD/lof0oOnSf3z+lbmwUbBRzMLIw/wCzJD/Gf0o/sqQ9ZX/DFboUUoUU+ZhZGdZaasLbiCW9Scmtu2Tbio41FW4hRe4i1HU61DHUy1Qh+aKKKYj/2Q==",
  masked_avenger: "data:image/jpeg;base64,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",
  elegant_duelist: "data:image/jpeg;base64,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",
  vengeful_widow: "data:image/jpeg;base64,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",
  rogue_scholar: "data:image/jpeg;base64,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",
  cardinals_guard: "data:image/jpeg;base64,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",
  street_urchin: "data:image/jpeg;base64,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",
  pirate_queen: "data:image/jpeg;base64,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"
};

const SUIT_ICONS = {
  Brutal: "https://drive.google.com/thumbnail?id=19_ut_Hdn_nhw6ZCAIOZf-IhpmV9zksVR&sz=w64",
  Elegant: "https://drive.google.com/thumbnail?id=1nxAiPnsnZ4pTGM_IhR9jNJDn5dwzV9hF&sz=w64",
  Improvised: "https://drive.google.com/thumbnail?id=16Tn9msEctsHb4vpd6y8VtzRREykHwIg8&sz=w64",
  Daring: "https://drive.google.com/thumbnail?id=1ICWbt_zbEuif-110DK0dSSP6BxMzy52P&sz=w64"
};

// --- PERSONA RULES ---
// Advantages and Disadvantages for all 12 core personas
const PERSONA_RULES = {
  gallant_captain: {
    adv: "Start with 12 Bravado. Regain 1 Bravado after defending successfully twice in a row.",
    dis: "Cannot Retreat more than 2 spaces total per turn.",
    maxRetreatsPerTurn: 2,
    consecutiveDefenceRegen: true,
  },
  masked_avenger: {
    adv: "Once per turn, may treat any Low card as Wild when attacking.",
    dis: "Starts with 9 Bravado.",
    lowAsWildPerTurn: true,
  },
  tavern_brawler: {
    adv: "Improvised cards gain +1 Attack.",
    dis: "Cannot play Elegant cards.",
    improvisedAtkBonus: 1,
    cannotPlaySuit: "Elegant",
  },
  elegant_duelist: {
    adv: "Full 3-card Elegant remise: draw 1 card afterwards.",
    dis: "Cannot use Brutal cards with Attack above 3.",
    elegantRemiseDraw: true,
    brutalAtkCap: 3,
  },
  pirate_queen: {
    adv: "Draw 1 card whenever you cause opponent to lose ground (Push, forced Retreat, or Location/Object effect).",
    dis: "Must discard 1 random card if defending twice in a row.",
    drawOnPush: true,
    consecutiveDefenceDiscard: true,
  },
  street_urchin: {
    adv: "At turn start, may swap 1 hand card with top of deck. On hit, steal 1 card from opponent's hand instead of 1 Bravado damage.",
    dis: "Cannot hold more than 4 Bravado.",
    maxBravado: 4,
    turnStartSwap: true,
    onHitSteal: true,
  },
  cardinals_guard: {
    adv: "Twice per duel, may ignore a Push or the Bravado loss from Retreat.",
    dis: "Starts with 9 Bravado.",
    guardUses: 2,
  },
  foppish_noble: {
    adv: "Remise of 1-2 continuation cards: opponent loses 1 extra Bravado (once per remise).",
    dis: "Voluntary Retreat costs 1 extra Bravado.",
    remiseBravadoBonus: true,
    retreatExtraCost: 1,
  },
  vengeful_widow: {
    adv: "All attacks gain +1 Attack when at 3 or fewer Bravado.",
    dis: "Cannot regain Bravado through defence (margin bonus, Riposte heal, or auto-parry heals).",
    lowBravadoAtkBonus: { threshold: 3, bonus: 1 },
    cannotRegenFromDefence: true,
  },
  rogue_scholar: {
    adv: "At start of turn, look at top 2 deck cards and reorder them.",
    dis: "If holding 3+ Brutal cards, must discard entire hand and redraw.",
    turnStartPeek: true,
    brutalHandPurge: { threshold: 3 },
  },
  highwayman: {
    adv: "Whenever own attack lands, opponent discards 1 card.",
    dis: "Opens with 4 cards (not 5).",
    onHitOpponentDiscard: true,
  },
  acrobat: {
    adv: "Wild cards gain +1 Attack when used offensively.",
    dis: "Cannot Push opponent with Low attacks.",
    wildAtkBonus: 1,
    noPushOnLow: true,
  },
};

// --- GAME STATE FACTORY ---
function mkPlayer(persona,isHuman,sharedDeck,sharedDiscard){
  // Persona starters always in opening hand
  const starterCards=(PERSONA_CARDS[persona.id]||[]).map(c=>({...c,uid:c.id+"-"+Math.random().toString(36).slice(2)}));
  // Draw from shared deck — Highwayman starts with 4, everyone else 5
  const drawCount = persona.startCards || 5;
  const{drawn,deck:remaining,discard:newDiscard}=drawN(sharedDeck,sharedDiscard,drawCount);
  const hand=[...starterCards,...drawn];
  return{
    persona,bravado:persona.startBravado,
    hand,deck:remaining,discard:newDiscard,
    position:isHuman?5:6,signatureUsed:false,isHuman,
    sharedDeck:true,
  };
}

// --- DEBUG LOGGER ---
const _debugLog = [];
let _debugTurn = 0;
let _debugSeq = 0;

function dbg(category, event, detail, state) {
  _debugSeq++;
  _debugLog.push({
    seq: _debugSeq,
    turn: _debugTurn,
    ts: new Date().toISOString(),
    category,   // ATTACK | PARRY | PUSH | PHASE | PERSONA | DAMAGE | DRAW | REMISE | RIPOSTE | CALLED_SHOT | ERROR
    event,      // short label e.g. "attack_resolved"
    detail,     // human-readable string
    state: state ? JSON.stringify(state) : null,
  });
}

function dbgState(player, ai, phase, extra) {
  return {
    phase,
    playerBravado: player.bravado,
    playerPos: player.position,
    playerHandSize: player.hand.length,
    playerPersona: player.persona.id,
    aiBravado: ai.bravado,
    aiPos: ai.position,
    aiHandSize: ai.hand.length,
    aiPersona: ai.persona.id,
    ...(extra || {}),
  };
}

function exportDebugLog() {
  const lines = [
    "THE FLASHING BLADE — DEBUG LOG",
    "Generated: " + new Date().toISOString(),
    "=".repeat(80),
    "",
  ];
  let lastTurn = -1;
  _debugLog.forEach(e => {
    if (e.turn !== lastTurn) {
      lines.push("");
      lines.push("--- TURN " + e.turn + " ---");
      lastTurn = e.turn;
    }
    const stateStr = e.state ? " | STATE: " + e.state : "";
    lines.push("[" + e.seq.toString().padStart(4,"0") + "] [" + e.category.padEnd(12) + "] " + e.event.padEnd(30) + " " + e.detail + stateStr);
  });
  lines.push("");
  lines.push("=".repeat(80));
  lines.push("END OF LOG — " + _debugLog.length + " entries");
  return lines.join("
");
}

function downloadDebugLog() {
  const text = exportDebugLog();
  const blob = new Blob([text], {type: "text/plain"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "flashing-blade-debug-" + Date.now() + ".txt";
  a.click();
  URL.revokeObjectURL(url);
}

// --- MAIN GAME ---
function Game({playerPersona}){
  const aiPersona=PERSONAS.find(p=>p.id!==playerPersona.id)||PERSONAS[1];

// --- Shared deck/discard: both players draw from the same pile ---
  const[sharedDeck,setSharedDeck]=useState(()=>buildSharedDeck());
  const[sharedDiscard,setSharedDiscard]=useState([]);

// --- Players: hand only (deck/discard managed at game level) ---
  const[player,setPlayer]=useState(()=>{
    const shared=buildSharedDeck();
    const starterCards=(PERSONA_CARDS[playerPersona.id]||[]).map(c=>({...c,uid:c.id+"-"+Math.random().toString(36).slice(2)}));
    const{drawn,deck:rem}=drawN(shared,[],5);
    return{persona:playerPersona,bravado:playerPersona.startBravado,hand:[...starterCards,...drawn],discard:[],position:5,signatureUsed:false,isHuman:true};
  });
  const[ai,setAi]=useState(()=>{
    const starterCards=(PERSONA_CARDS[aiPersona.id]||[]).map(c=>({...c,uid:c.id+"-"+Math.random().toString(36).slice(2)}));
    // AI draws from a second build of the same card pool
    // (exact same set of cards, different shuffle — shared draw resolved at runtime)
    const shared2=buildSharedDeck();
    const{drawn}=drawN(shared2,[],5);
    return{persona:aiPersona,bravado:aiPersona.startBravado,hand:[...starterCards,...drawn],discard:[],position:6,signatureUsed:false,isHuman:false};
  });
  // phases: "player_a1" | "player_a2" | "player_parry" | "ai_turn" | "sig_preview" | "over"
  const[phase,setPhase]=useState("player_a1");
  const[selected,setSelected]=useState(null);
  const[pendingAtk,setPendingAtk]=useState(null);
  const[log,setLog]=useState([]);
  const[winner,setWinner]=useState(null);
  const[flavourMsg,setFlavourMsg]=useState("");
  const[hitsThisTurn,setHitsThisTurn]=useState(0);
  const[consecutiveDefences,setConsecutiveDefences]=useState(0); // Captain regen / Queen discard tracking
  const[guardUsesLeft,setGuardUsesLeft]=useState(()=>(PERSONA_RULES[playerPersona.id]||{}).guardUses||0);
  const[lowAsWildUsed,setLowAsWildUsed]=useState(false); // Masked Avenger once-per-turn
  const[retreatsThisTurn,setRetreatsThisTurn]=useState(0); // Captain retreat limit
  const[scholarPeeked,setScholarPeeked]=useState(false); // Rogue Scholar turn-start peek done
  const[freeAdvancePending,setFreeAdvancePending]=useState(false);
  const[marginChoicePending,setMarginChoicePending]=useState(null); // {margin, parryZone} awaiting player choice
  const[ripostePending,setRipostePending]=useState(null); // {zone} player selecting riposte card
  const[calledShot,setCalledShot]=useState(null); // "High" | "Low" | null — declared before attack
  const[calledShotActive,setCalledShotActive]=useState(false); // current attack has called shot declared // landed attacks this turn (for remise gate)
  const[cardEvent,setCardEvent]=useState(null); // {name, effect, flavour, isSignature, actor}
  const[wildZonePending,setWildZonePending]=useState(null); // card awaiting zone declaration
  const[aiPersonaEvent,setAiPersonaEvent]=useState(null); // AI persona card shown to player before resolving
  const[followPending,setFollowPending]=useState(null); // {dir, spaces} awaiting attacker follow decision
  const[remiseCards,setRemiseCards]=useState([]); // cards played in remise chain
  const[remiseSuit,setRemiseSuit]=useState(null); // suit constraint for remise
  const[remiseZone,setRemiseZone]=useState(null); // zone constraint for remise

  const addLog=useCallback((text,t="info")=>setLog(prev=>[...prev.slice(-60),{text,t}]),[]);
  const showFlavour=useCallback((msg)=>setFlavourMsg(msg),[]);
  const triggerCardEvent=useCallback((name,effect,flavour,actor,isSignature)=>{
    setCardEvent({name,effect,flavour,actor,isSignature});
    // Also write a styled log entry
    const tag=isSignature?"[SIGNATURE]":"[PERSONA]";
    setLog(prev=>[...prev.slice(-60),{text:tag+" "+actor+": "+name+" — "+effect,t:"gold"}]);
  },[]);

  // Win check
  useEffect(()=>{
    if(player.bravado<=0&&!winner){setWinner(ai.persona.name);setPhase("over");}
    else if(ai.bravado<=0&&!winner){setWinner(player.persona.name);setPhase("over");}
  },[player.bravado,ai.bravado]);

  // Turn-start persona abilities — called explicitly with fresh state refs
  function applyTurnStartAbilities(pState, sDeck, sDisc) {
    const rules = PERSONA_RULES[pState.persona.id] || {};
    let p = {...pState};
    let deck = sDeck, disc = sDisc;
    let changed = false;

    // Rogue Scholar: peek top 2 deck cards
    if (rules.turnStartPeek && deck.length >= 2) {
      addLog("Rogue Scholar: top 2 deck cards are " + deck[0].name + " and " + deck[1].name + ".", "gold");
    }

    // Gallant Captain: regain 1 Bravado after 2+ consecutive successful defences
    if (rules.consecutiveDefenceRegen && consecutiveDefences >= 2) {
      p = gainBravado(1, p, "defence");
      addLog("Gallant Captain: 2 consecutive defences -- regain 1 Bravado (" + p.bravado + ").", "gold");
      setConsecutiveDefences(0);
      changed = true;
    }

    // Rogue Scholar disadvantage: if holding 3+ Brutal cards, discard hand and redraw
    if (rules.brutalHandPurge) {
      const brutalCount = p.hand.filter(c => c.suit === "Brutal").length;
      if (brutalCount >= rules.brutalHandPurge.threshold) {
        disc = [...disc, ...p.hand];
        p = {...p, hand: [], discard: [...p.discard, ...p.hand]};
        const res = drawN(deck, disc, 5);
        p = {...p, hand: res.drawn};
        deck = res.deck; disc = res.discard;
        setSharedDeck(deck); setSharedDiscard(disc);
        addLog("Rogue Scholar: " + brutalCount + " Brutal cards — hand discarded and redrawn!", "hit");
        changed = true;
      }
    }

    if (changed) setPlayer(p);
    return p;
  }

// --- Resolve a parry attempt by the human ---
// --- COMBAT HELPERS ---
  // Resolve attack landing: returns {newDefender, dmg, margin}
  function resolveLanding(attackCard, defenderState) {
    const dmg = 1;
    const d = {...defenderState, bravado: defenderState.bravado - dmg};
    return {newDefender: d, dmg, margin: 0};
  }

  // Apply margin-of-success attack bonus (ATK > DEF by 2+)
  function applyAttackMargin(margin, defenderState, log) {
    if (margin >= 2) {
      log("  Margin +" + margin + " — extra Bravado lost!", "hit");
      return {...defenderState, bravado: defenderState.bravado - 1};
    }
    return defenderState;
  }

  // Reset per-turn state
  function resetTurnState() {
    _debugTurn++;
    setHitsThisTurn(0);
    setRemiseCards([]);
    setRemiseSuit(null);
    setRemiseZone(null);
    setSelected(null);
    setFlavourMsg("");
    setCalledShot(null);
    setCalledShotActive(false);
    setMarginChoicePending(null);
    setRipostePending(null);
    setLowAsWildUsed(false);
    setRetreatsThisTurn(0);
    setScholarPeeked(false);
  }

  // Push defender one space away from attacker; returns updated {p, a}
  // Applies push of `pushVal` spaces to the defender (aState), away from attacker (pState).
  // Does NOT auto-follow — returns {p, a, followDir, followSpaces} for caller to prompt.
  function applyPush(pushVal, pState, aState, logPrefix) {
    const dir = aState.position > pState.position ? 1 : -1;
    let p = {...pState}, a = {...aState};
    const prefix = logPrefix || "Push " + pushVal;

    if ((dir > 0 && a.position >= 10) || (dir < 0 && a.position <= 1)) {
      a = {...a, bravado: a.bravado - 2};
      addLog("  CORNERED! " + a.persona.name + " loses 2 extra Bravado!", "hit");
      return {p, a, followDir: 0, followSpaces: 0};
    }

    const rawNew = a.position + dir * pushVal;
    if ((dir > 0 && rawNew > 10) || (dir < 0 && rawNew < 1)) {
      const edgePos = dir > 0 ? 10 : 1;
      a = {...a, position: edgePos, bravado: a.bravado - 2};
      addLog("  " + prefix + " — CORNERED at space " + edgePos + "! " + a.persona.name + " loses 2 extra Bravado!", "hit");
      // Attacker can follow up to the space before the edge
      return {p, a, followDir: dir, followSpaces: Math.abs(edgePos - 1 - p.position)};
    }

    a = {...a, position: rawNew};
    addLog("  " + prefix + " — " + a.persona.name + " forced to space " + rawNew + ".", "hit");
    return {p, a, followDir: dir, followSpaces: pushVal};
  }

  // Extract push value from a card — checks notes field and effect text
  function cardPushVal(card) {
    if (!card) return 0;
    // Explicit push field takes priority (set on specific persona cards)
    if (card.push) return card.push;
    // Default: Brutal suit cards push 1
    if (card.suit === "Brutal") return 1;
    return 0;
  }

  // Apply persona attack bonuses to a card before resolution
  function getEffectiveAtk(card, playerState) {
    const rules = PERSONA_RULES[playerState.persona.id] || {};
    let atk = card.attack;
    // Tavern Brawler: Improvised +1 ATK
    if (rules.improvisedAtkBonus && card.suit === "Improvised") atk += rules.improvisedAtkBonus;
    // Acrobat: Wild +1 ATK offensively
    if (rules.wildAtkBonus && card.zone === "Wild") atk += rules.wildAtkBonus;
    // Vengeful Widow: +1 ATK at <= 3 Bravado
    if (rules.lowBravadoAtkBonus && playerState.bravado <= rules.lowBravadoAtkBonus.threshold) {
      atk += rules.lowBravadoAtkBonus.bonus;
    }
    return atk;
  }

  // Check if a player can play a card (persona restrictions)
  function canPlayCard(card, playerState) {
    const rules = PERSONA_RULES[playerState.persona.id] || {};
    // Tavern Brawler: cannot play Elegant
    if (rules.cannotPlaySuit && card.suit === rules.cannotPlaySuit) return false;
    // Elegant Duelist: cannot use Brutal ATK > 3
    if (rules.brutalAtkCap && card.suit === "Brutal" && card.attack > rules.brutalAtkCap) return false;
    return true;
  }

  // Apply Bravado gain respecting persona restrictions
  function gainBravado(amount, playerState, source) {
    const rules = PERSONA_RULES[playerState.persona.id] || {};
    // Vengeful Widow: cannot regain from defence
    if (rules.cannotRegenFromDefence && source === "defence") return playerState;
    // Street Urchin: cap at maxBravado
    const cap = rules.maxBravado || playerState.persona.startBravado;
    return {...playerState, bravado: Math.min(playerState.bravado + amount, cap)};
  }

  // Apply foppish Noble extra retreat cost
  function getRetreatCost(playerState) {
    const rules = PERSONA_RULES[playerState.persona.id] || {};
    return 1 + (rules.retreatExtraCost || 0);
  }

  // Check if push should be suppressed (Acrobat no-push on Low)
  function shouldPush(card, playerState) {
    const rules = PERSONA_RULES[playerState.persona.id] || {};
    if (rules.noPushOnLow && card.zone === "Low") return false;
    return true;
  }

  // Prompt follow-up or auto-resolve if no follow possible
  function handlePushResult(result, phaseAfter, pFinal, aFinal) {
    setPlayer(pFinal || result.p);
    setAi(aFinal || result.a);
    if (result.followSpaces > 0 && result.followDir !== 0) {
      setFollowPending({dir: result.followDir, spaces: result.followSpaces, phaseAfter});
    } else {
      setFollowPending(null);
      setPhase(phaseAfter);
      if (phaseAfter === "ai_turn") setTimeout(() => runAiTurn(pFinal || result.p, aFinal || result.a), 700);
    }
  }

  function doFollow(follow) {
    if (!followPending) return;
    let p = {...player};
    if (follow) {
      const newPos = Math.max(1, Math.min(10, p.position + followPending.dir));
      if (newPos !== ai.position) {
        p = {...p, position: newPos};
        addLog("You advance into the vacated space (space " + newPos + ").");
      }
    } else {
      addLog("You hold your ground.");
    }
    const phase = followPending.phaseAfter;
    setFollowPending(null);
    setPlayer(p);
    setPhase(phase);
    if (phase === "ai_turn") setTimeout(() => runAiTurn(p, ai), 700);
  }



// --- RESOLVE HUMAN PARRY (AI attacked, human defends) ---
  function resolveHumanParry(parryCard) {
    if (!pendingAtk) return;
    let p = {...player}, a = {...ai};
    let attackLanded = false;
    let localMarginPending = false;

    if (parryCard) {
      const zoneOk = zonesMatch(parryCard.zone, pendingAtk.zone);
      const defOk = parryCard.defence >= pendingAtk.attack;
      p = {...p, hand: p.hand.filter(c => c.uid !== parryCard.uid), discard: [...p.discard, parryCard]};

      if (zoneOk && defOk) {
        // Parry succeeded
        const margin = parryCard.defence - pendingAtk.attack;
        addLog("Parried with " + parryCard.name + " (DEF " + parryCard.defence + " vs ATK " + pendingAtk.attack + ")", "parry");
        dbg("PARRY", "player_parry_success", "card=" + parryCard.name + " def=" + parryCard.defence + " atk=" + pendingAtk.attack + " margin=" + (parryCard.defence - pendingAtk.attack), dbgState(player, ai, phase));
        setConsecutiveDefences(c => c + 1);
        // Pirate Queen disadvantage: discard 1 random if defending twice in a row
        if ((PERSONA_RULES[player.persona.id]||{}).consecutiveDefenceDiscard && consecutiveDefences >= 1) {
          if (p.hand.length > 0) {
            const rIdx = Math.floor(Math.random() * p.hand.length);
            const lost = p.hand[rIdx];
            p = {...p, hand: p.hand.filter((_,i) => i !== rIdx), discard: [...p.discard, lost]};
            addLog("  Pirate Queen: defending twice in a row — discard " + lost.name + "!", "hit");
          }
        }
        if (margin >= 2) {
          addLog("  Crushing parry — margin " + margin + "! Choose your bonus.", "gold");
          // Vengeful Widow cannot gain Bravado through defence
          const widowRules = PERSONA_RULES[player.persona.id] || {};
          if (widowRules.cannotRegenFromDefence) {
            addLog("  Vengeful Widow: cannot gain Bravado through defence.", "gold");
            // Only offer discard or riposte options
            setMarginChoicePending({margin, parryZone: parryCard.zone === "Wild" ? pendingAtk.zone : parryCard.zone, noRegen: true});
          } else {
            setMarginChoicePending({margin, parryZone: parryCard.zone === "Wild" ? pendingAtk.zone : parryCard.zone, noRegen: false});
          }
          // Use local flag to pause before AI draw
          localMarginPending = true;
        }
      } else {
        // Parry failed — attack lands
        attackLanded = true;
        const margin = pendingAtk.attack - parryCard.defence;
        if (!zoneOk) {
          addLog("Zone mismatch — attack lands automatically! -1 Bravado.", "hit");
        } else {
          addLog("Parry failed — DEF " + parryCard.defence + " < ATK " + pendingAtk.attack + ". -1 Bravado.", "hit");
        }
        p = {...p, bravado: p.bravado - 1};
        if (margin >= 2 && zoneOk) {
          addLog("  Margin +" + margin + " — extra Bravado lost!", "hit");
          p = {...p, bravado: p.bravado - 1};
        }
      }
    } else {
      // No parry — undefended hit: 2 Bravado + discard 1 random from hand or deck
      attackLanded = true;
      p = {...p, bravado: p.bravado - 2};
      addLog("No parry — undefended hit! -2 Bravado (" + p.bravado + " remaining).", "hit");
      if (p.hand.length > 0) {
        const rIdx = Math.floor(Math.random() * p.hand.length);
        const lost = p.hand[rIdx];
        p = {...p, hand: p.hand.filter((_, i) => i !== rIdx), discard: [...p.discard, lost]};
        addLog("  You lose " + lost.name + " from your hand!", "hit");
      } else if (sharedDeck.length > 0 || sharedDiscard.length > 0) {
        const rIdx = Math.floor(Math.random() * Math.min(sharedDeck.length, 5));
        const lost = sharedDeck[rIdx];
        const newDeck = sharedDeck.filter((_, i) => i !== rIdx);
        setSharedDeck(newDeck); setSharedDiscard([...sharedDiscard, lost]);
        addLog("  You lose " + lost.name + " from the deck!", "hit");
      }
    }

    // If margin choice pending, resolve that first before continuing
    // (marginChoicePending is set above and will be handled by resolveMarginChoice)

    // Brutal push — AI attacked, so push player (p) away from AI (a)
    if (attackLanded && pendingAtk) {
      const pv = cardPushVal(pendingAtk);
      if (pv > 0) {
        // Roles reversed: defender=p is pushed, attacker=a follows
        // applyPush pushes aState away from pState, so we swap args and re-swap result
        const pushed = applyPush(pv, a, p, "Brutal Push " + pv);
        p = pushed.a; // p was passed as aState
        a = pushed.p; // a was passed as pState
        // AI auto-follows (AI decides to always follow)
        if (pushed.followSpaces > 0 && pushed.followDir !== 0) {
          const aiFollow = Math.max(1, Math.min(10, a.position + pushed.followDir * -1));
          if (aiFollow !== p.position) {
            a = {...a, position: aiFollow};
            addLog("  " + a.persona.name + " advances into the vacated space.");
          }
        }
      }
    }

    setPendingAtk(null);
    setSelected(null);

    // If margin choice is pending, pause here — AI draw happens after choice resolves
    if (localMarginPending) {
      setPlayer(p);
      setAi(a);
      setPhase("player_margin_choice");
      return;
    }

    // AI action 2 — draw from shared deck
    if (a.hand.length < 8) {
      const res = drawN(sharedDeck, sharedDiscard, 1);
      a = {...a, hand: [...a.hand, ...res.drawn]};
      setSharedDeck(res.deck); setSharedDiscard(res.discard);
      addLog(a.persona.name + " draws a card.");
    }

    // Apply turn-start persona abilities with fresh state
    p = applyTurnStartAbilities(p, sharedDeck, sharedDiscard);
    setPlayer(p);
    setAi(a);
    resetTurnState();
    // Free Advance check — offer if not adjacent
    if (!adjacent(p.position, a.position)) {
      setFreeAdvancePending(true);
      setPhase("player_free_advance");
    } else {
      setPhase("player_a1");
    }
  }

// --- AI TURN ---
  const runAiTurn = useCallback((pState, aState) => {
    let a = {...aState}, p = {...pState};
    let aiHits = 0;
    let lastHitCard = null;

    // Free Advance — AI advances for free if not adjacent
    if (!adjacent(a.position, p.position)) {
      const dir = p.position > a.position ? 1 : -1;
      const newPos = safeMove(a.position, dir, p.position);
      if (newPos !== a.position) {
        a = {...a, position: newPos};
        addLog(a.persona.name + " takes a free advance to space " + newPos + ".");
      }
    }

    // Action 1
    if (adjacent(a.position, p.position) && a.hand.length > 0) {
      let card = aiPickCard(a.hand, "attack");
      // If Wild, AI declares a zone — picks whichever zone the player has fewer cards in
      if (card && card.zone === "Wild") {
        const playerHighCount = p.hand.filter(c => c.zone === "High" || c.zone === "Wild").length;
        const playerLowCount = p.hand.filter(c => c.zone === "Low" || c.zone === "Wild").length;
        // Attack into the zone the player is weaker in
        const declaredZone = playerHighCount <= playerLowCount ? "High" : "Low";
        card = {...card, zone: declaredZone, declaredZone};
      }
      a = {...a, hand: a.hand.filter(c => c.uid !== card.uid), discard: [...a.discard, card]};
      const zoneLabel = card.declaredZone ? card.zone + " (Wild declared " + card.zone + ")" : card.zone;
      addLog(a.persona.name + " attacks with " + card.name + " [" + zoneLabel + " ATK " + card.attack + "]");
      dbg("ATTACK", "ai_attack", "card=" + card.name + " zone=" + card.zone + " atk=" + card.attack + " suit=" + card.suit + (card.declaredZone ? " declared=" + card.declaredZone : ""), dbgState(player, a, "ai_turn"));
      if (card.flavour) showFlavour(card.flavour);
      // If persona card — show panel to player before they must parry
      if (card.type === "Persona") {
        setAiPersonaEvent({
          name: card.name,
          effect: card.effect || ("Attack " + card.attack + " / Defence " + card.defence),
          flavour: card.flavour || "",
          actor: a.persona.name,
          zone: zoneLabel,
          attack: card.attack,
        });
      }
      setPendingAtk(card);
      setAi(a);
      setPlayer(p);
      setPhase("player_parry");
      return; // wait for human parry — AI action 2 happens in resolveHumanParry
    } else {
      const dir = p.position > a.position ? 1 : -1;
      const aiNewPos = safeMove(a.position, dir, p.position);
      if (aiNewPos !== a.position) {
        a = {...a, position: aiNewPos};
        addLog(a.persona.name + " advances.");
      }
    }

    // Action 2 — draw from shared deck
    if (a.hand.length < 8) {
      const res = drawN(sharedDeck, sharedDiscard, 1);
      a = {...a, hand: [...a.hand, ...res.drawn]};
      setSharedDeck(res.deck); setSharedDiscard(res.discard);
      addLog(a.persona.name + " draws.");
    }

    // Apply turn-start persona abilities with fresh state
    p = applyTurnStartAbilities(p, sharedDeck, sharedDiscard);
    setAi(a);
    setPlayer(p);
    resetTurnState();
    if (!adjacent(p.position, a.position)) {
      setFreeAdvancePending(true);
      setPhase("player_free_advance");
    } else {
      setPhase("player_a1");
    }
  }, [addLog, showFlavour]);

// --- PLAYER ACTIONS ---
  function doAction(action) {
    if (phase !== "player_a1" && phase !== "player_a2") return;
    let p = {...player}, a = {...ai};
    const isA1 = phase === "player_a1";
    let newHits = hitsThisTurn;

    if (action === "attack") {
      if (!selected) return;
      const isAdj = adjacent(p.position, a.position);
      const isGap = atGap(p.position, a.position) && selected.notes === "gap";
      if (!isAdj && !isGap) { addLog("Must be adjacent to attack (Improvised: 1-space gap OK)."); return; }

      // Persona restriction check
      if (!canPlayCard(selected, p)) {
        addLog(player.persona.name + " cannot play " + selected.suit + " cards.", "hit");
        return;
      }
      // Wild card: must declare zone before attacking
      if (selected.zone === "Wild") {
        setWildZonePending({card: selected, phase});
        return;
      }

      const card = selected;
      p = {...p, hand: p.hand.filter(c => c.uid !== card.uid), discard: [...p.discard, card]};
      if (card.flavour) showFlavour(card.flavour);
      // Compute effective attack (persona bonuses apply to all cards including persona type)
      const effectiveAtk = getEffectiveAtk(card, p);
      const attackCard = effectiveAtk !== card.attack ? {...card, attack: effectiveAtk} : card;
      if (card.type === "Persona") {
        triggerCardEvent(card.name, card.effect || ("Attack " + card.attack + " / Defence " + card.defence), card.flavour || "", player.persona.name, false);
      } else {
        if (effectiveAtk !== card.attack) addLog("  " + player.persona.name + " bonus: ATK " + card.attack + " -> " + effectiveAtk, "gold");
        addLog("You attack with " + card.name + " [" + card.zone + " ATK " + effectiveAtk + "]");
        dbg("ATTACK", "player_attack", "card=" + card.name + " zone=" + card.zone + " atk=" + effectiveAtk + " suit=" + card.suit, dbgState(p, a, phase));
      }
      // Track for remise constraints
      setRemiseSuit(card.suit);
      setRemiseZone(card.zone === "Wild" ? null : card.zone);

      // AI parry resolution
      const aiCard = a.hand.length > 0 ? aiPickCard(a.hand, "parry", attackCard) : null;
      let attackLanded = false;

      if (aiCard) {
        const zoneOk = zonesMatch(aiCard.zone, attackCard.zone);
        const defOk = aiCard.defence >= attackCard.attack;
        a = {...a, hand: a.hand.filter(c => c.uid !== aiCard.uid), discard: [...a.discard, aiCard]};

        if (zoneOk && defOk) {
          const margin = aiCard.defence - card.attack;
          addLog(a.persona.name + " parries with " + aiCard.name + " (DEF " + aiCard.defence + ")", "parry");
          dbg("PARRY", "ai_parry_success", "card=" + aiCard.name + " def=" + aiCard.defence + " atk=" + attackCard.attack + " margin=" + (aiCard.defence - attackCard.attack), dbgState(p, a, phase));
          if (margin >= 2) {
            // AI takes best margin option: gain Bravado
            a = {...a, bravado: Math.min(a.bravado + 1, a.persona.startBravado)};
            addLog("  Crushing parry — margin " + margin + "! " + a.persona.name + " gains 1 Bravado.", "parry");
          }
        } else {
          attackLanded = true;
          const atkMargin = attackCard.attack - aiCard.defence;
          if (!zoneOk) {
            addLog(a.persona.name + " zone mismatch — attack lands! -1 Bravado.", "hit");
            dbg("PARRY", "ai_parry_fail_zone", "attackZone=" + attackCard.zone + " parryZone=" + aiCard.zone + " ai_bravado=" + (a.bravado-1), dbgState(p, a, phase));
          } else {
            addLog(a.persona.name + " parry failed (DEF " + aiCard.defence + " < ATK " + card.attack + ") — -1 Bravado.", "hit");
            dbg("PARRY", "ai_parry_fail_def", "def=" + aiCard.defence + " atk=" + attackCard.attack + " shortfall=" + (attackCard.attack - aiCard.defence), dbgState(p, a, phase));
          }
          a = {...a, bravado: a.bravado - 1};
          dbg("DAMAGE", "attack_damage", "target=ai bravado_after=" + (a.bravado) + " source=failed_parry", null);
          if (atkMargin >= 2 && zoneOk) {
            addLog("  Margin +" + atkMargin + " — extra Bravado lost!", "hit");
            a = {...a, bravado: a.bravado - 1};
            dbg("DAMAGE", "margin_bonus_damage", "margin=" + atkMargin + " target=ai bravado_after=" + (a.bravado), null);
          }
          if (calledShotActive) {
            a = {...a, bravado: a.bravado - 1};
            addLog("  Called Shot hits! Extra Bravado damage.", "hit");
            setCalledShot(null); setCalledShotActive(false);
          }
        }
      } else {
        attackLanded = true;
        // No parry attempted — 2 Bravado + discard 1 random card from next draw
        a = {...a, bravado: a.bravado - 2};
        addLog(a.persona.name + " has no cards — undefended hit! -2 Bravado.", "hit");
        // Discard random card from deck as penalty (hand is empty)
        if (sharedDeck.length > 0) {
          const rIdx = Math.floor(Math.random() * Math.min(sharedDeck.length, 5));
          const lost = sharedDeck[rIdx];
          const newDeck = sharedDeck.filter((_, i) => i !== rIdx);
          setSharedDeck(newDeck); setSharedDiscard([...sharedDiscard, lost]);
          addLog("  " + a.persona.name + " loses " + lost.name + " from the deck!", "hit");
        }
      }

      if (attackLanded) {
        newHits = newHits + 1;
        setHitsThisTurn(newHits);
        // Push on any landed Brutal hit (or card with explicit push value)
        const pv = shouldPush(attackCard || card, p) ? cardPushVal(attackCard || card) : 0;
        if (pv > 0) {
          const pushed = applyPush(pv, p, a, "Push " + pv);
          p = pushed.p;
          a = pushed.a;
          setPlayer(p); setAi(a);
          // Check remise gate then offer follow
          // Pirate Queen: draw 1 on Push
          if (pv > 0 && (PERSONA_RULES[p.persona.id]||{}).drawOnPush) {
            const res = drawN(sharedDeck, sharedDiscard, 1);
            if (p.hand.length < 8) p = {...p, hand: [...p.hand, ...res.drawn]};
            setSharedDeck(res.deck); setSharedDiscard(res.discard);
            addLog("  Pirate Queen: draw 1 from Push!", "gold");
          }
        const nextPhase = (newHits >= 2) ? "player_remise" : (isA1 ? "player_a2" : "ai_turn");
          if (pushed.followSpaces > 0) {
            setFollowPending({dir: pushed.followDir, spaces: pushed.followSpaces, phaseAfter: nextPhase});
            setSelected(null);
            return; // wait for follow decision
          }
        }
      }
      setSelected(null);

    } else if (action === "advance") {
      const dir = a.position > p.position ? 1 : -1;
      const newPos = safeMove(p.position, dir, a.position);
      if (newPos === p.position) { addLog("Cannot advance — opponent is blocking."); }
      else { p = {...p, position: newPos}; addLog("You advance."); }

    } else if (action === "retreat") {
      if (!p.hand.length) { addLog("No card to discard for Retreat."); return; }
      const dir = a.position > p.position ? -1 : 1;
      const newRetPos = Math.max(1, Math.min(10, p.position + dir));
      if (newRetPos === p.position) { addLog("Cannot retreat — at edge of track."); return; }
      const toDiscard = p.hand[0];
      const retreatCost = getRetreatCost(p);
      // Captain: max 2 retreats per turn
      const captainRules = PERSONA_RULES[p.persona.id] || {};
      if (captainRules.maxRetreatsPerTurn && retreatsThisTurn >= captainRules.maxRetreatsPerTurn) {
        addLog(p.persona.name + " cannot Retreat more than " + captainRules.maxRetreatsPerTurn + " times per turn.", "hit");
        return;
      }
      p = {...p, position: newRetPos, bravado: p.bravado - retreatCost,
           hand: p.hand.slice(1), discard: [...p.discard, toDiscard]};
      setRetreatsThisTurn(retreatsThisTurn + 1);
      addLog("You retreat — discard " + toDiscard.name + ", -" + retreatCost + " Bravado.");

    } else if (action === "draw") {
      if (p.hand.length >= 8) { addLog("Hand limit: 8 cards."); return; }
      const res = drawN(sharedDeck, sharedDiscard, 1);
      p = {...p, hand: [...p.hand, ...res.drawn]};
      setSharedDeck(res.deck); setSharedDiscard(res.discard);
      addLog("You draw a card.");

    } else if (action === "flourish") {
      if (!selected) { addLog("Select a card to discard for Flourish."); return; }
      const cap = p.persona.startBravado;
      if (p.bravado >= cap) {
        // Still do discard+draw but no Bravado gain
        const toDiscard = selected;
        p = {...p, hand: p.hand.filter(c => c.uid !== toDiscard.uid), discard: [...p.discard, toDiscard]};
        const res = drawN(sharedDeck, sharedDiscard, 1);
        p = {...p, hand: [...p.hand, ...res.drawn]};
        setSharedDeck(res.deck); setSharedDiscard(res.discard);
        addLog("Flourish — discard " + toDiscard.name + ", draw 1 (at Bravado cap, no gain).", "gold");
      } else {
        const toDiscard = selected;
        p = {...p, hand: p.hand.filter(c => c.uid !== toDiscard.uid), discard: [...p.discard, toDiscard],
             bravado: p.bravado + 1};
        const res = drawN(sharedDeck, sharedDiscard, 1);
        p = {...p, hand: [...p.hand, ...res.drawn]};
        setSharedDeck(res.deck); setSharedDiscard(res.discard);
        addLog("Flourish — discard " + toDiscard.name + ", +1 Bravado, draw 1.", "gold");
      }
      setSelected(null);
    }

    setPlayer(p);
    setAi(a);

    if (isA1) {
      setPhase("player_a2");
    } else {
      // End of action phase — check remise gate
      if (newHits >= 2) {
        // Unlock remise — set up constraints from last attack card
        // We need the last attack card's suit/zone — store in state from action above
        // For now we derive from selected (already null) so we pass via a temp approach:
        // Actually we set remiseSuit/Zone when attack lands; see below
        addLog("Two hits this turn — REMISE UNLOCKED! Chain up to 2 cards (same suit & zone as last attack).", "gold");
        dbg("PHASE", "remise_unlocked", "hits=" + newHits + " suit=" + remiseSuit + " zone=" + remiseZone, null);
        setPhase("player_remise");
      } else {
        setPhase("ai_turn");
        setTimeout(() => runAiTurn(p, a), 700);
      }
    }
  }

// --- REMISE PHASE ---
  function declareWildZone(zone) {
    if (!wildZonePending) return;
    const {card, phase: savedPhase} = wildZonePending;
    // Create a copy with the declared zone
    const declaredCard = {...card, zone, declaredZone: zone};
    setWildZonePending(null);
    setSelected(declaredCard);
    // Re-invoke attack with the declared card
    // We need to re-run the attack logic — easiest is to store declared card and re-trigger
    // Actually we call the attack logic directly here
    const isA1 = savedPhase === "player_a1";
    let p = {...player}, a = {...ai};
    let newHits = hitsThisTurn;

    p = {...p, hand: p.hand.filter(c => c.uid !== declaredCard.uid), discard: [...p.discard, declaredCard]};
    if (declaredCard.flavour) showFlavour(declaredCard.flavour);
    if (declaredCard.type === "Persona") {
      triggerCardEvent(declaredCard.name, declaredCard.effect || ("Attack " + declaredCard.attack + " / Defence " + declaredCard.defence), declaredCard.flavour || "", player.persona.name, false);
    } else {
      addLog("You attack with " + declaredCard.name + " [" + zone + " ATK " + declaredCard.attack + "] (Wild declared " + zone + ")");
    }
    setRemiseSuit(declaredCard.suit);
    setRemiseZone(zone);

    const aiCard = a.hand.length > 0 ? aiPickCard(a.hand, "parry", declaredCard) : null;
    let attackLanded = false;

    if (aiCard) {
      const zoneOk = zonesMatch(aiCard.zone, zone);
      const defOk = aiCard.defence >= declaredCard.attack;
      a = {...a, hand: a.hand.filter(c => c.uid !== aiCard.uid), discard: [...a.discard, aiCard]};
      if (zoneOk && defOk) {
        const margin = aiCard.defence - declaredCard.attack;
        addLog(a.persona.name + " parries with " + aiCard.name + " (DEF " + aiCard.defence + ")", "parry");
        if (margin >= 2) {
          a = {...a, bravado: Math.min(a.bravado + 1, a.persona.startBravado)};
          addLog("  Crushing parry! " + a.persona.name + " gains 1 Bravado.", "parry");
        }
      } else {
        attackLanded = true;
        const atkMargin = declaredCard.attack - aiCard.defence;
        if (!zoneOk) {
          addLog(a.persona.name + " zone mismatch — attack lands! -1 Bravado.", "hit");
        } else {
          addLog(a.persona.name + " parry failed — -1 Bravado.", "hit");
        }
        a = {...a, bravado: a.bravado - 1};
        if (atkMargin >= 2 && zoneOk) {
          addLog("  Margin +" + atkMargin + " — extra Bravado lost!", "hit");
          a = {...a, bravado: a.bravado - 1};
        }
      }
    } else {
      attackLanded = true;
      a = {...a, bravado: a.bravado - 2};
      addLog(a.persona.name + " has no cards — undefended! -2 Bravado.", "hit");
      if (sharedDeck.length > 0) {
        const rIdx = Math.floor(Math.random() * Math.min(sharedDeck.length, 5));
        const lost = sharedDeck[rIdx];
        setSharedDeck(sharedDeck.filter((_, i) => i !== rIdx));
        setSharedDiscard([...sharedDiscard, lost]);
        addLog("  " + a.persona.name + " loses " + lost.name + " from the deck!", "hit");
      }
    }

    if (attackLanded) {
      newHits = newHits + 1;
      setHitsThisTurn(newHits);
      const pv = shouldPush(declaredCard, p) ? cardPushVal(declaredCard) : 0;
      if (pv > 0) {
        const pushed = applyPush(pv, p, a, "Push " + pv);
        p = pushed.p; a = pushed.a;
        setPlayer(p); setAi(a);
        const nextPhase = (newHits >= 2) ? "player_remise" : (isA1 ? "player_a2" : "ai_turn");
        if (pushed.followSpaces > 0) {
          setFollowPending({dir: pushed.followDir, spaces: pushed.followSpaces, phaseAfter: nextPhase});
          setSelected(null);
          return;
        }
      }
    }

    setSelected(null);
    setPlayer(p);
    setAi(a);

    if (newHits >= 2 && attackLanded) {
      addLog("Two hits — REMISE UNLOCKED!", "gold");
      setPhase("player_remise");
    } else if (isA1) {
      setPhase("player_a2");
    } else {
      setPhase("ai_turn");
      setTimeout(() => runAiTurn(p, a), 700);
    }
  }

  function doRemise(card) {
    if (remiseSuit && card.suit !== remiseSuit && card.zone !== "Wild") {
      addLog("Remise requires " + remiseSuit + " suit (or Wild).", "info");
      return;
    }
    if (remiseZone && !zonesMatch(card.zone, remiseZone)) {
      addLog("Remise requires " + remiseZone + " zone (or Wild).", "info");
      return;
    }

    let p = {...player}, a = {...ai};
    const newChain = [...remiseCards, card];
    p = {...p, hand: p.hand.filter(c => c.uid !== card.uid), discard: [...p.discard, card]};
    if (card.flavour) showFlavour(card.flavour);
    addLog("  Remise: " + card.name + " [ATK " + card.attack + "] — lands automatically!", "hit");
    a = {...a, bravado: a.bravado - 1};
    setSelected(null);

    if (newChain.length >= 2) {
      // Max chain — resolve push immediately with fresh state refs
      setRemiseCards(newChain);
      finishRemise(newChain, p, a);
    } else {
      // One card played, wait for second or manual end
      setRemiseCards(newChain);
      setPlayer(p);
      setAi(a);
    }
  }

  function endRemise() {
    // Called manually — use current player/ai state (already up to date from last doRemise)
    finishRemise(remiseCards, player, ai);
  }

  function finishRemise(chain, p, a) {
    // Push: each Brutal card in chain pushes 1; full 2-card all-Brutal chain = Push 2
    const brutalCount = chain.filter(c => c.suit === "Brutal").length;
    const push = brutalCount > 0 ? ((chain.length === 2 && brutalCount === 2) ? 2 : brutalCount) : 0;

    // Foppish Noble: remise of 1-2 cards adds 1 extra Bravado damage
    const nobleRules = PERSONA_RULES[p.persona.id] || {};
    if (nobleRules.remiseBravadoBonus && chain.length >= 1) {
      a = {...a, bravado: a.bravado - 1};
      addLog("  Foppish Noble: remise bonus — 1 extra Bravado damage!", "gold");
    }
    // Elegant Duelist: full 3-card Elegant remise draws 1 card
    const duelistRules = PERSONA_RULES[p.persona.id] || {};
    if (duelistRules.elegantRemiseDraw && chain.length === 2 && chain.every(c => c.suit === "Elegant")) {
      const res = drawN(sharedDeck, sharedDiscard, 1);
      if (p.hand.length < 8) p = {...p, hand: [...p.hand, ...res.drawn]};
      setSharedDeck(res.deck); setSharedDiscard(res.discard);
      addLog("  Elegant Duelist: full Elegant remise — draw 1 card!", "gold");
    }
    addLog("Remise complete — " + chain.length + " card" + (chain.length !== 1 ? "s" : "") +
      " chained" + (push > 0 ? ", Push " + push : "") + ".", "gold");
    dbg("REMISE", "remise_complete", "chain=" + chain.map(c=>c.name).join("+") + " push=" + push + " brutalCount=" + chain.filter(c=>c.suit==="Brutal").length, dbgState(p, a, "remise"));

    if (push > 0) {
      const pushed = applyPush(push, p, a, "Push " + push);
      p = pushed.p;
      a = pushed.a;
      setPlayer(p);
      setAi(a);
      resetTurnState();
      if (pushed.followSpaces > 0) {
        setFollowPending({dir: pushed.followDir, spaces: pushed.followSpaces, phaseAfter: "ai_turn"});
      } else {
        setPhase("ai_turn");
        setTimeout(() => runAiTurn(p, a), 700);
      }
    } else {
      setPlayer(p);
      setAi(a);
      resetTurnState();
      setPhase("ai_turn");
      setTimeout(() => runAiTurn(p, a), 700);
    }
  }




// --- Signature move (stub — logs effect, marks used) ---
// --- PLAY PERSONA EFFECT CARD ---
  function playEffectCard() {
    if (!selected || !isEffectCard(selected)) return;
    if (phase !== "player_a1" && phase !== "player_a2") return;
    const isA1 = phase === "player_a1";
    let p = {...player}, a = {...ai};
    const card = selected;

    // Remove from hand, mark used (single-use)
    p = {...p, hand: p.hand.filter(c => c.uid !== card.uid), discard: [...p.discard, card]};
    triggerCardEvent(card.name, card.effect || "Special effect", card.flavour || "", player.persona.name, false);
    if (card.flavour) showFlavour(card.flavour);

    // Resolve known effects by card name
    const name = card.name;

    if (name === "Hold the Line" || name === "Shield Wall" || name === "Perfect Counter" ||
        name === "Table Flip" || name === "Cold Defiance") {
      // Auto-parry cards — mark player as having an auto-parry queued this turn
      // For now: log effect, grant +2 Bravado as a stand-in and note it's a parry-phase card
      addLog("  Auto-parry ready — will block next attack this turn. (Full parry-phase trigger coming soon.)", "gold");
      // TODO: set a state flag autoParryReady=true and consume it in resolveHumanParry

    } else if (name === "Captain's Roar" || name === "Boarding Cry") {
      p = {...p, bravado: Math.min(p.bravado + 1, p.persona.startBravado)};
      // Opponent discards 1 random card
      if (a.hand.length > 0) {
        const idx = Math.floor(Math.random() * a.hand.length);
        const discarded = a.hand[idx];
        a = {...a, hand: a.hand.filter((_, i) => i !== idx), discard: [...a.discard, discarded]};
        addLog("  +1 Bravado. " + a.persona.name + " discards " + discarded.name + ".", "gold");
      } else {
        addLog("  +1 Bravado. " + a.persona.name + " has no cards to discard.", "gold");
      }

    } else if (name === "Brawl Instinct") {
      const res1 = drawN(sharedDeck, sharedDiscard, 2);
      p = {...p, hand: [...p.hand, ...res1.drawn]};
      setSharedDeck(res1.deck); setSharedDiscard(res1.discard);
      // Must discard 1
      if (p.hand.length > 0) {
        const toDiscard = p.hand[p.hand.length - 1];
        p = {...p, hand: p.hand.slice(0, -1), discard: [...p.discard, toDiscard]};
        addLog("  Drew 2, discarded " + toDiscard.name + ".", "gold");
      }

    } else if (name === "Quick Fingers") {
      if (p.hand.length > 0 && sharedDeck.length > 0 || sharedDiscard.length > 0) {
        const swapped = p.hand[p.hand.length - 1];
        const res = drawN(sharedDeck, sharedDiscard, 1);
        p = {...p,
          hand: [...p.hand.slice(0, -1), ...res.drawn],
          discard: [...p.discard, swapped]};
        setSharedDeck(res.deck); setSharedDiscard(res.discard);
        addLog("  Swapped " + swapped.name + " with top of deck.", "gold");
      }

    } else if (name === "Vanish" || name === "Coward's Dodge" || name === "Highway Escape") {
      const retreatDir = a.position > p.position ? -1 : 1;
      const retreatSpaces = name === "Highway Escape" ? 2 : 1;
      const newPos = Math.max(1, Math.min(10, p.position + retreatDir * retreatSpaces));
      const bravadoCost = name === "Coward's Dodge" ? 0 : (name === "Highway Escape" ? 1 : 0);
      p = {...p, position: newPos, bravado: p.bravado - bravadoCost};
      addLog("  Retreat " + retreatSpaces + (bravadoCost > 0 ? " (-" + bravadoCost + " Bravado)" : " (free)") + " to space " + newPos + ".", "gold");
      if (name === "Vanish") {
        p = {...p, bravado: Math.min(p.bravado + 1, p.persona.startBravado)};
        addLog("  +1 Bravado.", "gold");
      }

    } else if (name === "Mocking Wit" || name === "Lecture") {
      addLog("  " + a.persona.name + " must discard 1 card of their choice.", "gold");
      if (a.hand.length > 0) {
        // AI discards lowest-attack card
        const worst = a.hand.reduce((b, c) => c.attack < b.attack ? c : b, a.hand[0]);
        a = {...a, hand: a.hand.filter(c => c.uid !== worst.uid), discard: [...a.discard, worst]};
        addLog("  " + a.persona.name + " discards " + worst.name + ".", "gold");
      }
      if (name === "Lecture") {
        const res = drawN(sharedDeck, sharedDiscard, 1);
        p = {...p, hand: [...p.hand, ...res.drawn]};
        setSharedDeck(res.deck); setSharedDiscard(res.discard);
        addLog("  You draw 1.", "gold");
      }

    } else if (name === "Last Stand") {
      if (p.bravado <= 3) {
        p = {...p, bravado: Math.min(p.bravado + 2, p.persona.startBravado)};
        addLog("  +2 Bravado (" + p.bravado + " remaining).", "gold");
      } else {
        addLog("  No effect — Last Stand only triggers at 3 or fewer Bravado.", "info");
      }

    } else if (name === "For the Cardinal!") {
      p = {...p, bravado: Math.min(p.bravado + 1, p.persona.startBravado)};
      addLog("  +1 Bravado. Next Push is ignored. (Push immunity coming in next build.)", "gold");

    } else {
      addLog("  Effect logged — full resolution in next build.", "gold");
    }

    setSelected(null);
    setPlayer(p);
    setAi(a);

    if (isA1) { setPhase("player_a2"); }
    else {
      setPhase("ai_turn");
      setTimeout(() => runAiTurn(p, a), 700);
    }
  }

// --- FREE ADVANCE ---
  function doFreeAdvance(take) {
    if (take) {
      const dir = ai.position > player.position ? 1 : -1;
      const newPos = safeMove(player.position, dir, ai.position);
      if (newPos !== player.position) {
        setPlayer(p => ({...p, position: newPos}));
        addLog("Free Advance — you move to space " + newPos + ".");
      } else {
        addLog("Free Advance skipped — already adjacent.");
      }
    } else {
      addLog("Free Advance skipped.");
    }
    setFreeAdvancePending(false);
    setPhase("player_a1");
  }

// --- MARGIN CHOICE ---
  function resolveMarginChoice(choice) {
    if (!marginChoicePending) return;
    const {margin, parryZone} = marginChoicePending;
    setMarginChoicePending(null);

    if (choice === "bravado") {
      if (marginChoicePending && marginChoicePending.noRegen) {
        addLog("  Vengeful Widow cannot gain Bravado through defence.", "gold");
      } else {
        setPlayer(p => ({...p, bravado: Math.min(p.bravado + 1, p.persona.startBravado)}));
        addLog("  Margin bonus — you gain 1 Bravado.", "gold");
      }
      setPhase("player_a1");
    } else if (choice === "discard") {
      // Force AI to discard lowest-value card
      setAi(a => {
        if (!a.hand.length) { addLog("  Opponent has no cards to discard.", "gold"); return a; }
        const worst = a.hand.reduce((b, c) => c.attack < b.attack ? c : b, a.hand[0]);
        addLog("  Margin bonus — " + a.persona.name + " discards " + worst.name + ".", "gold");
        return {...a, hand: a.hand.filter(c => c.uid !== worst.uid), discard: [...a.discard, worst]};
      });
      setPhase("player_a1");
    } else if (choice === "riposte") {
      addLog("  Riposte! Select a card to counter-attack (same zone as parry, ATK 3 or less).", "gold");
      setRipostePending({zone: parryZone});
      setPhase("player_riposte");
    }
  }

// --- RIPOSTE ---
  function doRiposte(card) {
    if (!ripostePending) return;
    const {zone} = ripostePending;

    if (!zonesMatch(card.zone, zone)) {
      addLog("Riposte card must match parry zone (" + zone + ").", "info");
      return;
    }
    if (card.attack > 3) {
      addLog("Riposte Attack value cannot exceed 3 (this card is ATK " + card.attack + ").", "info");
      return;
    }

    let p = {...player}, a = {...ai};
    p = {...p, hand: p.hand.filter(c => c.uid !== card.uid), discard: [...p.discard, card]};
    addLog("Riposte — " + card.name + " [ATK " + card.attack + "] lands automatically!", "hit");
    a = {...a, bravado: a.bravado - 1};
    if (card.suit === "Brutal") {
      const pushed = applyPush(1, a, p, "Riposte Push 1");
      // Riposte roles: p attacked a, so a is pushed away from p
      // applyPush(pushVal, attackerState, defenderState)
      const res = applyPush(1, p, a, "Riposte Brutal Push");
      a = res.a; p = res.p;
    }

    setPlayer(p);
    setAi(a);
    setRipostePending(null);
    setSelected(null);
    addLog("Riposte resolved — roles now swap.", "gold");
    setPhase("ai_turn");
    setTimeout(() => runAiTurn(p, a), 700);
  }

// --- CALLED SHOT ---
  function declareCalledShot(zone) {
    setCalledShot(zone);
    setCalledShotActive(true);
    addLog("Called Shot declared — targeting " + zone + ". +1 Bravado damage on hit; +1 discard if parried.", "gold");
  }

  function clearCalledShot() {
    setCalledShot(null);
    setCalledShotActive(false);
  }

  function doSignature(){
    if(player.signatureUsed){addLog("Signature move already used this duel.");return;}
    const sig=SIGNATURES[player.persona.id];
    if(!sig)return;
    triggerCardEvent(sig.name, sig.effect, "", player.persona.name, true);
    setPlayer(p=>({...p,signatureUsed:true}));
  }

  if(phase==="over"){
    return(
      <div style={{minHeight:"100vh",background:T.bgDark,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12}}>
        <div style={{fontFamily:"Georgia,serif",fontSize:30,color:T.gold,letterSpacing:4}}>{winner===player.persona.name?"Victory!":"Defeated."}</div>
        <div style={{color:T.goldDim,fontSize:13}}>{winner} wins the duel.</div>
        <Btn label="Fight Again" onClick={()=>window.location.reload()} color={T.gold}/>
      </div>
    );
  }

  const isParry=phase==="player_parry";
  const isMyTurn=phase==="player_a1"||phase==="player_a2";
  const isWildPending = !!wildZonePending;
  const isFollowPending = !!followPending;
  const isFreeAdvance = phase === "player_free_advance";
  const isMarginChoice = phase === "player_margin_choice";
  const isRiposte = phase === "player_riposte";
  const canAtk=isMyTurn&&selected&&!isFollowPending&&!isWildPending&&(adjacent(player.position,ai.position)||(atGap(player.position,ai.position)&&selected.notes==="gap"));
  const isRemise = phase === "player_remise";
  const phaseLabel = isFollowPending ? "Advance into the vacated space?"
    : isFreeAdvance ? "Free Advance — move toward opponent for free?"
    : isMarginChoice ? "Crushing parry! Choose your bonus:"
    : isRiposte ? "Riposte — select a counter-attack card (same zone, ATK 3 or less)"
    : isWildPending ? "Wild card — declare your zone: " + wildZonePending.card.name
    : isParry
    ? "Defend! — " + (pendingAtk ? pendingAtk.name : "") + " incoming (ATK " + (pendingAtk ? pendingAtk.attack : "") + " / " + (pendingAtk ? pendingAtk.zone : "") + ")"
    : isRemise
      ? "REMISE! Chain up to 2 cards — same suit (" + remiseSuit + ") & zone (" + (remiseZone || "any") + "). Auto-land. " + remiseCards.length + "/2 played."
      : phase === "ai_turn" ? "Opponent's turn..."
      : "Your turn — Action " + (phase === "player_a1" ? 1 : 2) + " of 2";

  return(
    <>
    <div style={{minHeight:"100vh",background:T.bgDark,color:T.parchment,fontFamily:"system-ui,sans-serif",padding:"12px 14px",maxWidth:740,margin:"0 auto"}}>
      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:10}}>
        <div style={{fontFamily:"Georgia,serif",fontSize:16,color:T.gold,letterSpacing:4}}>THE FLASHING BLADE</div>
        <div style={{fontSize:8,color:T.walnut,letterSpacing:2}}>v2.2</div>
      </div>

      {/* Bravado bars */}
      <div style={{display:"flex",gap:10,marginBottom:10,alignItems:"center"}}>
        <BravadoBar current={player.bravado} max={player.persona.startBravado} label={player.persona.name} color={T.blue} portrait={PERSONA_PORTRAITS[player.persona.id]}/>
        <div style={{width:1,height:44,background:T.walnut,flexShrink:0}}/>
        <BravadoBar current={ai.bravado} max={ai.persona.startBravado} label={ai.persona.name} color={T.red} portrait={PERSONA_PORTRAITS[ai.persona.id]}/>
      </div>

      {/* Duel Track */}
      <div style={{marginBottom:10}}><DuelTrack playerPos={player.position} aiPos={ai.position}/></div>

      {/* Phase banner */}
      <div style={{textAlign:"center",fontFamily:"Georgia,serif",fontSize:11,color:T.gold,letterSpacing:2,textTransform:"uppercase",borderTop:`1px solid ${T.walnut}`,borderBottom:`1px solid ${T.walnut}`,padding:"5px 0",marginBottom:8}}>
        {phaseLabel}
      </div>

      {/* Flavour line */}
      {flavourMsg&&<div style={{textAlign:"center",fontSize:10,color:T.goldDim,fontStyle:"italic",marginBottom:6,minHeight:14}}>"{flavourMsg}"</div>}

      {/* AI hand (face down) */}
      <div style={{marginBottom:8}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
          <div style={{fontSize:10,color:T.goldDim,fontFamily:"Georgia,serif"}}>{ai.persona.name}</div>
          <div style={{
            background:"#2A1008",border:"1px solid "+T.walnut,borderRadius:4,
            padding:"2px 10px",fontSize:11,fontWeight:700,color:T.gold,fontFamily:"Georgia,serif",
            letterSpacing:1,
          }}>
            {ai.hand.length} <span style={{fontSize:8,color:T.goldDim,fontWeight:400}}>cards</span>
            {sharedDeck.length > 0 && <span style={{fontSize:8,color:T.walnut,marginLeft:6}}>{"+" + sharedDeck.length + " shared deck"}</span>}
          </div>
        </div>
        <div style={{display:"flex",gap:4,overflowX:"auto",paddingBottom:2}}>
          {ai.hand.slice(0,10).map((_,i)=><CardTile key={i} card={null} faceDown small/>)}
        </div>
      </div>

      {/* Action buttons */}
      <div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}>
        {isFollowPending ? (
          <>
            <Btn label="Advance into vacated space" onClick={() => doFollow(true)} color={T.green}/>
            <Btn label="Hold your ground" onClick={() => doFollow(false)} color={T.gold}/>
          </>
        ) : isFreeAdvance ? (
          <>
            <Btn label="Free Advance" onClick={() => doFreeAdvance(true)} color={T.green}/>
            <Btn label="Skip" onClick={() => doFreeAdvance(false)} color={T.gold}/>
          </>
        ) : isMarginChoice ? (
          <>
            <Btn label="Gain 1 Bravado" onClick={() => resolveMarginChoice("bravado")} color={T.green}/>
            <Btn label="Force opponent discard" onClick={() => resolveMarginChoice("discard")} color={T.amber}/>
            <Btn label="Riposte (counter-attack)" onClick={() => resolveMarginChoice("riposte")} color={T.red}/>
          </>
        ) : isRiposte ? (
          <>
            <Btn label={selected ? "Riposte with " + selected.name + " (ATK " + selected.attack + ")" : "Select a card to Riposte"} onClick={() => selected && doRiposte(selected)} disabled={!selected} color={T.red}/>
            <Btn label="Decline riposte" onClick={() => { setRipostePending(null); setSelected(null); setPhase("ai_turn"); setTimeout(() => runAiTurn(player, ai), 700); }} color={T.gold}/>
          </>
        ) : isWildPending ? (
          <>
            <div style={{fontSize:10,color:T.gold,padding:"6px 4px",fontFamily:"Georgia,serif",alignSelf:"center"}}>
              {wildZonePending.card.name} — declare zone:
            </div>
            <Btn label="High" onClick={() => declareWildZone("High")} color={T.blue}/>
            <Btn label="Low" onClick={() => declareWildZone("Low")} color={T.amber}/>
            <Btn label="Cancel" onClick={() => setWildZonePending(null)} color={T.walnutMid}/>
          </>
        ) : isParry ? (
          <>
            <Btn label={selected ? "Parry with " + selected.name : "Select card to parry"} onClick={() => resolveHumanParry(selected)} disabled={!selected} color={T.blue}/>
            <Btn label="Take the hit" onClick={() => resolveHumanParry(null)} color={T.red}/>
          </>
        ) : isRemise ? (
          <>
            <Btn label={selected ? "Chain: " + selected.name + " (ATK " + selected.attack + ")" : "Select a card to chain"} onClick={() => { if(selected) doRemise(selected); }} disabled={!selected} color={T.red}/>
            <Btn label={"Done — end remise (" + remiseCards.length + " card" + (remiseCards.length !== 1 ? "s" : "") + " played)"} onClick={endRemise} color={T.gold}/>
            <div style={{fontSize:9,color:T.purple,padding:"7px 4px",fontStyle:"italic",alignSelf:"center"}}>Same suit + zone as last attack — lands automatically</div>
          </>
        ) : isMyTurn ? (
          <>
            {(PERSONA_RULES[player.persona.id]||{}).turnStartSwap && phase === "player_a1" && (
              <Btn label="Swap card with deck" onClick={() => {
                let p = {...player};
                if (p.hand.length > 0 && sharedDeck.length > 0) {
                  const swapped = p.hand[p.hand.length - 1];
                  const res = drawN(sharedDeck, sharedDiscard, 1);
                  p = {...p, hand: [...p.hand.slice(0,-1), ...res.drawn], discard: [...p.discard, swapped]};
                  setSharedDeck(res.deck); setSharedDiscard(res.discard);
                  setPlayer(p);
                  addLog("Street Urchin: swapped " + swapped.name + " with top of deck.", "gold");
                }
              }} color={T.amber} small/>
            )}
            <Btn label="Attack" onClick={() => doAction("attack")} disabled={!canAtk} color={T.red}/>
            {!calledShotActive && isMyTurn && (
              <>
                <Btn label="Called Shot: High" onClick={() => declareCalledShot("High")} color={T.blue} small/>
                <Btn label="Called Shot: Low" onClick={() => declareCalledShot("Low")} color={T.amber} small/>
              </>
            )}
            {calledShotActive && (
              <div style={{fontSize:9,color:T.gold,padding:"6px 4px",fontStyle:"italic",alignSelf:"center"}}>
                Called Shot: {calledShot} declared — attack to trigger
                <span onClick={clearCalledShot} style={{marginLeft:8,color:T.red,cursor:"pointer"}}>[cancel]</span>
              </div>
            )}
            {selected && isEffectCard(selected) && (
              <Btn label={"Play: " + selected.name} onClick={playEffectCard} color={T.purple}/>
            )}
            <Btn label="Advance" onClick={() => doAction("advance")} color={T.gold}/>
            <Btn label="Retreat" onClick={() => doAction("retreat")} color={T.gold}/>
            <Btn label="Draw" onClick={() => doAction("draw")} color={T.green}/>
            <Btn label="Flourish" onClick={() => doAction("flourish")} disabled={!selected} color={T.amber}/>
            <Btn label={player.signatureUsed ? "Signature (used)" : "Sig: " + ((SIGNATURES[player.persona.id]||{}).name||"")} onClick={doSignature} disabled={player.signatureUsed} color={T.purple}/>
          </>
        ) : (
          <div style={{color:T.walnut,fontSize:11,fontStyle:"italic",padding:"6px 0"}}>Waiting for opponent...</div>
        )}
      </div>

      {/* Player hand */}
      <div style={{marginBottom:8}}>
        <div style={{fontSize:9,color:T.goldDim,letterSpacing:1,marginBottom:4}}>
          Your hand — {player.hand.length} cards
          {selected&&<span style={{color:T.gold,marginLeft:8}}>Selected: {selected.name}</span>}
        </div>
        <div style={{display:"flex",gap:5,overflowX:"auto",paddingBottom:6}}>
          {player.hand.map(c=>(
            <CardTile key={c.uid} card={c} selected={selected && selected.uid===c.uid}
              onClick={()=>setSelected(p=>p && p.uid===c.uid?null:c)}
              disabled={!isMyTurn && !isParry && !isRemise && !isRiposte}/>
          ))}
          {!player.hand.length&&<div style={{color:T.walnut,fontStyle:"italic",fontSize:11}}>No cards in hand</div>}
        </div>
      </div>

      {/* Signature info */}
      {!player.signatureUsed&&(
        <div style={{background:T.bgMid,border:"1px solid #3A1A5A",borderRadius:4,padding:"5px 8px",marginBottom:4,fontSize:9,color:T.purple}}>
          <span style={{fontWeight:700,letterSpacing:1}}>SIG:</span> {(SIGNATURES[player.persona.id]||{}).name} {"--"} {(SIGNATURES[player.persona.id]||{}).effect}
        </div>
      )}
      {(PERSONA_RULES[player.persona.id]||{}).adv && (
        <div style={{display:"flex",gap:6,marginBottom:8,fontSize:9}}>
          <div style={{flex:1,background:"#081A08",border:"1px solid #1A4A1A",borderRadius:4,padding:"4px 7px",color:"#78C878"}}>
            <span style={{fontWeight:700}}>ADV: </span>{(PERSONA_RULES[player.persona.id]||{}).adv}
          </div>
          <div style={{flex:1,background:"#1A0808",border:"1px solid #4A1A1A",borderRadius:4,padding:"4px 7px",color:"#E87070"}}>
            <span style={{fontWeight:700}}>DIS: </span>{(PERSONA_RULES[player.persona.id]||{}).dis}
          </div>
        </div>
      )}

      {/* Combat log */}
      <Log entries={log}/>

      <div style={{marginTop:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{fontSize:8,color:"#2A1A08",fontStyle:"italic"}}>
          Location Draft · Riposte choice UI · Object cards — coming in next build
        </div>
        <button onClick={downloadDebugLog} style={{
          background:"#0E0806",border:"1px solid #2A1A08",color:"#3A2510",
          padding:"3px 8px",borderRadius:3,cursor:"pointer",fontSize:8,
          fontFamily:"monospace",letterSpacing:1,
        }} title="Export debug log for bug reporting">
          [Export Debug Log]
        </button>
      </div>
    </div>
    <CardEventPanel event={cardEvent} onDone={()=>setCardEvent(null)}/>
    <AiPersonaPanel event={aiPersonaEvent} onDismiss={()=>setAiPersonaEvent(null)}/>
    </>
  );
}

export default function App(){
  const[persona,setPersona]=useState(null);
  if(!persona)return <PersonaSelector onSelect={setPersona}/>;
  return <Game playerPersona={persona}/>;
}
