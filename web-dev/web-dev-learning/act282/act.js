let xmlContent = '';
        let tableBooks = document.getElementById('event');
        fetch('act.xml').then((response)=> {
            response.text().then((xml)=>{
                xmlContent = xml;

                let parser = new DOMParser();
                let xmlDOM = parser.parseFromString(xmlContent, 'application/xml');
                let books = xmlDOM.querySelectorAll('event');

                books.forEach(bookXmlNode => {

                    let row = document.createElement('tr');

                    //title
                    let td = document.createElement('td');
                    td.innerText = bookXmlNode.children[0].innerHTML;
                    row.appendChild(td);

                    //  theme 
                    td = document.createElement('td');
                    td.innerText = bookXmlNode.children[1].innerHTML;
                    row.appendChild(td);
                    
                    //date
                    td = document.createElement('td');
                    td.innerText = bookXmlNode.children[2].innerHTML;
                    row.appendChild(td);

                    //lieu
                    td = document.createElement('td');
                    td.innerText = bookXmlNode.children[3].innerHTML;
                    row.appendChild(td);

                    tableBooks.children[1].appendChild(row);
                    
                });
                
            });
        });    