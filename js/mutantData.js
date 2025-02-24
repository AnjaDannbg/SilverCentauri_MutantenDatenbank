'use strict';

const mutantDataCSV =
  `Produkt,Startjahr,Endjahr,Tierart,Anzahl Tiere,Erfolgsquote,Erfolgreiche Mutierungen,Kommentar
SIM1,1999,2001,Langschwanzmakake,50,8%,4,[Kommentar]
SIM2,2001,2002,Langschwanzmakake,80,17%,14,[Kommentar]
SIM3,2001,2006,Langschwanzmakake,200,26%,52,Einführung Kaninchen
SIM4,2006,2011,Langschwanzmakake,100,12%,12,[Kommentar]
SIM5,2012,2017,Langschwanzmakake,400,40%,160,Einführung Katzen
SIM6,2018,2023,Langschwanzmakake,300,81%,243,[Kommentar]
SIM7,2024,2027,Langschwanzmakake,200,87%,174,[Kommentar]
CUN1,2002,2002,Kaninchen,120,5%,6,[Kommentar]
CUN2,2003,2004,Kaninchen,50,6%,3,[Kommentar]
CUN3,2004,2008,Kaninchen,400,10%,40,[Kommentar]
CUN4,2008,2013,Kaninchen,1200,23%,276,Erfolgreiche Kommerzialisierung
CUN5,2012,2014,Kaninchen,100,22%,22,[Kommentar]
CUN6,2015,2020,Kaninchen,400,64%,256,[Kommentar]
CUN7,2021,2026,Kaninchen,400,63%,252,[Kommentar]
CUN8,2027,2027,Kaninchen,40,64%,26,[Kommentar]
FEL1,2016,2016,Katze,100,4%,4,[Kommentar]
FEL2,2016,2017,Katze,150,9%,14,[Kommentar]
FEL3,2017,2022,Katze,400,30%,120,Pause
FEL4,2018,2022,Katze,300,57%,171,Linus
FEL5,2023,2027,Katze,500,53%,265,[Kommentar]
FEL6,2025,2027,Katze,100,54%,54,LinusII
CAN1,2017,2017,Hund,100,2%,2,[Kommentar]
CAN2,2017,2017,Hund,100,10%,10,[Kommentar]
CAN3,2017,2019,Hund,300,28%,84,Bellé
CAN4,2018,2023,Hund,520,54%,281,[Kommentar]
CAN5,2023,2027,Hund,300,53%,159,[Kommentar]`;