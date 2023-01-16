
const redirect = (to) => document.location = to

const loadElement = (what, where) => {
    return fetch(what)
        .then(function (res) {
            return res.text();
        })
        .then(function (res) {
            let el = document.getElementById(where);
            if (el == null)
                throw `The target is null (${where})`;
            el.innerHTML = res;
        });
};

const loadNav = (page) => {
    loadElement(`${page['relative_root']}/nav.html`, 'insert-nav')
        .then((res) => {
            navPrep(page)
        })
}

const loadSidebar = (page) => {
    loadElement(`${page['relative_root']}/sidebar.html`, 'insert-sidebar')
        .then((res) => {
            navPrep(page)
        })
}

const loadFooter = (page) => loadElement(`${page['relative_root']}/footer.html`, 'insert-footer');

const navPrep = (page) => {

    let sources = document.querySelectorAll('img');

    for (let i = 0; i < sources.length; i ++) {
        if (sources[i].getAttribute('src') !== null) {
            let org = sources[i].getAttribute('src');
            let mod = org.replaceAll('\{ROOT\}', page['relative_root'])

            console.log('Transl. Relative Root :: ' + org + ' -> ' + mod)
            sources[i].setAttribute('src', mod)
        }
    }

    let elems = document.getElementsByClassName('indicate-nav-link');

    for (let i = 0; i < elems.length; i++) {
        if (elems[i].getAttribute('href') !== null) {
            let org = elems[i].getAttribute('href');
            let mod = org.replaceAll('\{ROOT\}', page['relative_root'])

            console.log('Transl. Relative Root :: ' + org + ' -> ' + mod)
            elems[i].setAttribute('href', mod)
        }

        if (elems[i].innerHTML === page['nav'])
            elems[i].classList.add('extra-text-brighter-force')
    }

    if (page['sidebar'] === null)
        return

    elems = document.getElementsByClassName('indicate-sidebar-entry');

    for (let i = 0; i < elems.length; i++) {
        if (elems[i].getAttribute('href') !== null) {
            let org = elems[i].getAttribute('href');
            let mod = org.replaceAll('\{ROOT\}', page['relative_root'])

            // For some reason, the 'href' attrib doesn't work as expected, so we need
            // to add our own listener here
            elems[i].addEventListener('click', (evt) => {
                document.location = mod
            })

            console.log('Transl. Relative Root :: ' + org + ' -> ' + mod + " & Added listener")
        }

        if (elems[i].innerHTML === page['sidebar']) {
            elems[i].classList.add('extra-bg-blue')
            elems[i].classList.remove('extra-sidebar-entry-highlightable')
        }
    }

}

const loadEverything = (page) => {
    loadNav(page);
    loadFooter(page);
    document.title = page['title']
};
