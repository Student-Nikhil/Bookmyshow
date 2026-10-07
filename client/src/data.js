export const moviesList = ["Suraj par Mangal Bhari","Tenet","The War with Grandpa","The Personal History of David Copperfield","Come Play"];
export const slots = ["10:00 AM","01:00 PM","03:00 PM","06:00 PM","09:00 PM"];
export const seats = ["A1","A2","B1","B2","C1","C2","D1","D2"];
export const movieMeta = {
  "Suraj par Mangal Bhari": { rating: "8.1", genre: "Comedy / Drama", lang: "Hindi", c: ["#c0392b", "#6d1a12"] },
  "Tenet": { rating: "8.4", genre: "Action / Sci-Fi", lang: "English", c: ["#1f3a5f", "#0b1626"] },
  "The War with Grandpa": { rating: "6.9", genre: "Comedy / Family", lang: "English", c: ["#2e7d32", "#123d15"] },
  "The Personal History of David Copperfield": { rating: "7.3", genre: "Drama / Comedy", lang: "English", c: ["#8d6e63", "#3e2723"] },
  "Come Play": { rating: "6.2", genre: "Horror / Thriller", lang: "English", c: ["#37474f", "#0d1114"] },
};
export const seatInfo = {
  A1: ["Premium Recliner", 450], A2: ["Premium Plus", 400],
  B1: ["Executive", 320], B2: ["Executive Plus", 300],
  C1: ["Classic", 220], C2: ["Classic Plus", 200],
  D1: ["Economy", 150], D2: ["Economy Plus", 120],
};

export const cities = ["Pune", "Mumbai", "Delhi-NCR", "Bengaluru", "Hyderabad", "Chennai", "Kolkata"];
export const tabs = ["Movies", "Stream", "Events", "Plays", "Sports", "Activities"];
export const banners = [
  { tag: "LIVE IN CONCERT", title: "Midnight Echoes", sub: "17th October • Open-air arena", c: ["#b26a00", "#3b2200"] },
  { tag: "BLOCKBUSTER WEEKEND", title: "Book Movie Tickets", sub: "Flat 20% off on your first booking", c: ["#c62849", "#4a0d1c"] },
  { tag: "COMEDY NIGHT", title: "Laugh Out Loud", sub: "Stand-up specials all month", c: ["#1565c0", "#0a1f44"] },
  { tag: "STREAM PREMIERE", title: "New Releases Every Friday", sub: "Watch from the comfort of home", c: ["#2e7d32", "#0e2a10"] },
];
const L = (a) => a.map(([title, cat, date, venue, lang, promoted]) => ({ title, cat, date, venue, lang, promoted }));
export const explore = {
  Events: {
    cats: ["Workshops", "Music Shows", "Comedy Shows", "Performances", "Kids", "Screening", "Exhibitions", "Conferences", "Talks", "Meetups", "New Year Parties", "Role Play"],
    items: L([
      ["Midnight Echoes Live", "Music Shows", "Sat, 17 Oct", "Open Air Arena", "Hindi", 1],
      ["Legacy World Tour", "Music Shows", "Sat, 10 Oct", "City Dome", "Hindi", 1],
      ["Folk Beats Live", "Performances", "Sat, 26 Dec onwards", "Cultural Centre", "Hindi"],
      ["Nostalgia Nights", "Music Shows", "Sun, 11 Oct onwards", "Riverside Club", "English"],
      ["Pottery Workshop", "Workshops", "Sun, 18 Oct", "Studio 9", "English"],
      ["Stand-up Special", "Comedy Shows", "Fri, 16 Oct", "Laugh Factory", "Hindi"],
      ["Kids Science Fair", "Kids", "Sat, 24 Oct", "Expo Hall", "English"],
      ["Startup Summit 2026", "Conferences", "Thu, 5 Nov", "Convention Centre", "English"],
      ["Photography Exhibition", "Exhibitions", "Daily, 8 Oct onwards", "Art Gallery", "English"],
      ["New Year Bash 2027", "New Year Parties", "Thu, 31 Dec", "Beach Resort", "Hindi"],
    ]),
  },
  Plays: {
    cats: ["Theatre", "Storytelling", "Improv Theatre", "Interactive Theatre", "Mime", "Monologue"],
    items: L([
      ["Humare Ram – Live Epic", "Theatre", "Thu, 15 Oct onwards", "Grand Theatre", "Hindi", 1],
      ["Goshtarang", "Storytelling", "Thu, 8 Oct", "Cultural Centre", "Marathi", 1],
      ["The Great Musical", "Theatre", "Wed, 25 Nov onwards", "Grand Theatre", "Hindi"],
      ["Premika – Poetry Show", "Storytelling", "Sun, 18 Oct", "Black Box", "Hindi"],
      ["Improv Night Live", "Improv Theatre", "Sat, 17 Oct", "The Loft", "English"],
      ["Silent Stories", "Mime", "Fri, 23 Oct", "Studio Theatre", "English"],
      ["One Voice, Many Lives", "Monologue", "Sun, 25 Oct", "Black Box", "English"],
      ["You Decide the Ending", "Interactive Theatre", "Sat, 31 Oct", "The Loft", "Hindi"],
    ]),
  },
  Sports: {
    cats: ["Running", "Cycling", "Shooting", "Baseball", "Chess", "Sailing"],
    items: L([
      ["Baseball League: Opening Day", "Baseball", "Sat, 24 Oct", "City Stadium", "English", 1],
      ["Midnight Cycling", "Cycling", "Fri, 9 Oct onwards", "Marine Drive", "English"],
      ["Winter Run & Ride Challenge", "Running", "Sat, 10 Oct onwards", "Virtual", "English"],
      ["City Marathon", "Running", "Sun, 6 Dec", "Race Course", "English"],
      ["Rapid Chess Open", "Chess", "Sun, 18 Oct", "Club House", "English"],
      ["Harbour Sailing Day", "Sailing", "Sat, 14 Nov", "Yacht Club", "English"],
      ["Pistol Shooting Meet", "Shooting", "Sat, 21 Nov", "Range 7", "English"],
      ["Trail Run 10K", "Running", "Sun, 1 Nov", "Hill Park", "Hindi"],
    ]),
  },
  Activities: {
    cats: ["Unique Tours", "Tourist Attractions", "Gaming", "Adventure", "Amusement Parks", "Food and Drinks", "Nightlife", "Festivals", "Monuments"],
    items: L([
      ["Garba Nights 16", "Festivals", "Sun, 11 Oct onwards", "Dome Arena", "Hindi", 1],
      ["Snow Kingdom", "Amusement Parks", "Tue, 6 Oct onwards", "Snow Park", "English", 1],
      ["Illusion Museum", "Tourist Attractions", "Tue, 6 Oct onwards", "City Mall", "English"],
      ["Water Park Splash", "Amusement Parks", "Wed, 7 Oct onwards", "Fun Valley", "English"],
      ["Heritage Walk", "Unique Tours", "Sat, 10 Oct", "Old Town", "English"],
      ["VR Gaming Arena", "Gaming", "Daily", "Pixel Zone", "English"],
      ["Sunset Paragliding", "Adventure", "Sat, 17 Oct", "Hill Point", "Hindi"],
      ["Street Food Trail", "Food and Drinks", "Sun, 18 Oct", "Market Lane", "Hindi"],
    ]),
  },
};
export const streamItems = [
  { title: "One Night Only", meta: "1h 42m • Comedy, Romantic • A", lang: "English", desc: "Recently dumped Owen and hopeful romantic Allie might be the only two singles in the city looking for more than just a quick encounter.", c: ["#00695c", "#071b19"] },
  { title: "The Last Lighthouse", meta: "2h 05m • Thriller • UA", lang: "English, Hindi", desc: "A keeper on a remote island discovers that the light he guards is signalling someone, or something, out at sea.", c: ["#283593", "#0a0d2b"] },
  { title: "Monsoon Letters", meta: "1h 55m • Drama • U", lang: "Hindi", desc: "Two strangers begin exchanging letters during one long rainy season, and neither is who they claim to be.", c: ["#ad1457", "#2e0a1a"] },
];
export const premieres = ["Weekend Getaway", "The Great Bake-Off Show", "Deep Blue", "One Night Only", "City of Dust", "Little Big Dreams", "Neon Streets", "Paper Planes"];
export const footerGroups = [
  ["HELP", ["About Us", "Contact Us", "Current Opening", "Press Release", "FAQs", "Terms and Conditions", "Privacy Policy"]],
  ["EXCLUSIVES", ["Corporate Vouchers", "Gift Cards", "List My Show", "Offers", "Stream", "Trailers"]],
  ["THINGS TO DO IN TOP CITIES", cities.map((c) => `Things to do in ${c}`)],
];
