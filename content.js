let done = false;

window.addEventListener("load", prettifyGradescope);

// From pretty-bonnie. This might not be necessary
document.addEventListener('DOMSUbtreeModified', function(e) {
    if (done) return;
    setTimeout(function() {
        prettifyGradescope(this);
    }, 500);
}, false);

function prettifyGradescope(e) {
    var elements = document.querySelectorAll('.testCase');
    Array.prototype.forEach.call(elements, function(el, i) {
        let output = el.getElementsByTagName('div')[1].getElementsByTagName('pre');
        output = output[0].innerHTML;
        let index = output.indexOf("Traceback");
        let consoleOutput = JSON.parse(output.slice(0, index));
        let traceback = output.slice(index);
        /* create a table */
        let tbl = document.createElement('table');
        tbl.style.width = '100%';
        tbl.setAttribute('border', 1);
        let tbody = document.createElement('tbody');
        for (var key in consoleOutput) {
            // create row
            let tr = document.createElement('tr');
            tr.style = `
              border: 1px solid;
            `;
            let _key = document.createElement('td');
            _key.style = `
              border-right: 1px solid;
            `;
            let _value = document.createElement('td');
            _key.appendChild(document.createTextNode(key));
            let pre = document.createElement('pre');
            pre.innerHTML = (consoleOutput[key]);
            _value.appendChild(pre);
            tr.appendChild(_key);
            tr.appendChild(_value);
            tbody.appendChild(tr);
        }
        let tr = document.createElement('tr');
        tr.style = `
              border: 1px solid;
        `;
        let _key = (document.createElement('td'))
        _key.style = `
              border-right: 1px solid;
            `;
        _key.appendChild(document.createTextNode('Traceback'))
        let pre = document.createElement('pre');
        pre.innerHTML = traceback;
        let _value = document.createElement('td')
        _value.appendChild(pre);
        tr.appendChild(_key);
        tr.appendChild(_value);
        tbody.appendChild(tr);

        tbl.appendChild(tbody);
        el.appendChild(tbl);
        done = true;
    });
}