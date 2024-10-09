// ==UserScript==
// @name             Auto Typer for Nitro Type
// @match            https://www.nitrotype.com/race
// @match            https://www.nitrotype.com/race/*
// @author           Sing Developments
// @grant            none
// @description      Auto Typer for Nitro Type by Sing Developments. Enjoy! 
// @license MIT
// @version          7
// @namespace        singdev.free.nf
// @icon             https://static.wixstatic.com/media/3bccf5_ab8963d996264eb5921e535431b03830~mv2.png
// @downloadURL https://update.greasyfork.org/scripts/454996/Auto%20Typer%20for%20Nitro%20Type.user.js
// @updateURL https://update.greasyfork.org/scripts/454996/Auto%20Typer%20for%20Nitro%20Type.meta.js
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(function() {
        document.querySelectorAll('.structure--nitrotype .race-host-controls .btn')[2].click();
    }, 1500);

    const findReact = (dom, traverseUp = 0) => {
        const key = Object.keys(dom).find((key) => key.startsWith("__reactFiber$"))
        const domFiber = dom[key]
        if (domFiber == null) return null
        const getCompFiber = (fiber) => {
            let parentFiber = fiber?.return
            while (typeof parentFiber?.type == "string") {
                parentFiber = parentFiber?.return
            }
            return parentFiber
        }
        let compFiber = getCompFiber(domFiber)
        for (let i = 0; i > traverseUp && compFiber; i++) {
            compFiber = getCompFiber(compFiber)
        }
        return compFiber?.stateNode
    }

    var token = 0
    var t = 0
    // Modify typedStats to set the typed value to a large number
    setInterval(function() {
        const raceContainer = document.querySelector('.race-container');
        if (raceContainer) {
            const reactInstance = findReact(raceContainer);
            if (reactInstance && reactInstance.typedStats) {
                reactInstance.typedStats.typed = 10000000000000;
            }
        }
    }, 1000);

})();
