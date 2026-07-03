var exec = require('child_process').execSync;
var fs = require('fs');

// ---- PODESAVANJA ----
var folderPath = 'C:\\Users\\David\\Desktop\\projekat44';
var cssFile = folderPath + '\\style.css';
var htmlFile = folderPath + '\\44.html';
var jsFile = folderPath + '\\script.js';

// ---- LISTE PROMENA ----

var boje = ['#e94560', '#e63946', '#2196f3', '#4caf50', '#ff9800', '#9c27b0', '#00bcd4'];
var velicine = ['1.8rem', '1.9rem', '2rem', '2.1rem', '2.2rem', '2.3rem'];
var razmaci = ['4rem', '4.5rem', '5rem', '5.5rem', '6rem'];
var zaobljenost = ['8px', '10px', '12px', '14px', '16px'];

var poruke = [
    "['Hello!', 'Welcome!', 'Click again!']",
    "['Hi there!', 'Projekat 44', 'Nice click!']",
    "['Hello from JS!', 'Welcome back!', 'Try again!']",
    "['Pozdrav!', 'Dobrodosao!', 'Klikni opet!']"
];

var podnaslovi = [
    'A modern web project built with HTML, CSS and JavaScript.',
    'Clean design. Simple code. Great results.',
    'Built with passion using web technologies.',
    'Simple and beautiful web project.'
];

// ---- POMOCNE FUNKCIJE ----

// vraca random element iz niza
function random(niz) {
    var index = Math.floor(Math.random() * niz.length);
    return niz[index];
}

// citanje fajla
function citaj(putanja) {
    return fs.readFileSync(putanja, 'utf8');
}

// pisanje fajla
function pisi(putanja, sadrzaj) {
    fs.writeFileSync(putanja, sadrzaj);
}

// git komanda
function git(komanda) {
    exec(komanda, { cwd: folderPath });
}

// napravi commit
function commit(poruka) {
    git('git add -A');
    git('git commit -m "' + poruka + '"');
    console.log('  commit: ' + poruka);
}

// menja vrednost CSS svojstva za dati selektor
function promeniCSS(selektor, svojstvo, vrednost) {
    var css = citaj(cssFile);
    // nadjemo blok selektora i u njemu zamenimo svojstvo
    var regex = new RegExp('(' + selektor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*\\{[^}]*?)' + svojstvo + ':\\s*[^;]+;', 's');
    var novo = css.replace(regex, '$1' + svojstvo + ': ' + vrednost + ';');
    pisi(cssFile, novo);
}

// ---- SVE MOGUCE PROMENE ----

function promenaBojeAkcenta() {
    var boja = random(boje);
    promeniCSS('.nav-logo', 'color', boja);
    promeniCSS('.hero-content h1', 'color', boja);
    promeniCSS('.btn', 'background', boja);
    commit('update accent color to ' + boja);
}

function promenaVelicineNaslova() {
    var vel = random(velicine);
    promeniCSS('.hero-content h1', 'font-size', vel);
    commit('update hero title font size to ' + vel);
}

function promenaRazmakaSekcijeAbout() {
    var pad = random(razmaci);
    promeniCSS('.about', 'padding', pad + ' 2rem');
    commit('update about section padding to ' + pad);
}

function promenaZaobljenostiKartice() {
    var r = random(zaobljenost);
    promeniCSS('.card', 'border-radius', r);
    commit('update card border radius to ' + r);
}

function promenaRazmakaContact() {
    var pad = random(razmaci);
    promeniCSS('.contact', 'padding', pad + ' 2rem');
    commit('update contact padding to ' + pad);
}

function promenaBojeNavBtn() {
    var boja = random(boje);
    promeniCSS('.nav-btn', 'border', '2px solid ' + boja);
    commit('update nav button border color');
}

function promenaPoruka() {
    var poruka = random(poruke);
    var js = citaj(jsFile);
    js = js.replace(/\[.*\]/, poruka);
    pisi(jsFile, js);
    commit('update JS button messages');
}

function promenaPoднаслова() {
    var tekst = random(podnaslovi);
    var html = citaj(htmlFile);
    html = html.replace(/<p>.*?<\/p>/, '<p>' + tekst + '</p>');
    pisi(htmlFile, html);
    commit('update hero subtitle text');
}

function promenaFootera() {
    var godina = new Date().getFullYear();
    var html = citaj(htmlFile);
    html = html.replace(/&copy; \d+ Projekat 44[^<]*/, '&copy; ' + godina + ' Projekat 44. All rights reserved.');
    pisi(htmlFile, html);
    commit('update footer copyright year');
}

// ---- LISTA SVIH PROMENA ----
var svePromene = [
    promenaBojeAkcenta,
    promenaVelicineNaslova,
    promenaRazmakaSekcijeAbout,
    promenaZaobljenostiKartice,
    promenaRazmakaContact,
    promenaBojeNavBtn,
    promenaPoruka,
    promenaPoднаслова,
    promenaFootera
];

// ---- GLAVNI PROGRAM ----

// random broj promena izmedju 5 i 12
var brojPromenа = Math.floor(Math.random() * 8) + 5;

// izmesaj listu pa uzmi prvih N
var izmesane = svePromene.slice().sort(function() { return Math.random() - 0.5; });
var odabrane = izmesane.slice(0, brojPromenа);

console.log('Auto-commit: pravim ' + brojPromenа + ' commitova...');

for (var i = 0; i < odabrane.length; i++) {
    try {
        odabrane[i]();
    } catch (e) {
        console.log('  greska: ' + e.message);
    }
}

// push sve na GitHub
try {
    git('git push origin main');
    console.log('Uspesno pushvano na GitHub!');
} catch (e) {
    console.log('Push greska: ' + e.message);
}
