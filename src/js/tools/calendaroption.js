var person;

const participants = document.getElementById('participants');
const selector = document.getElementById('add-person');

export async function setupPerson() {
    person = await window.api.getperson();

    if (selector) {
        person.forEach(p => {
            const option = document.createElement('option');
            option.innerHTML = p.name;
            option.value = p.uid;
            const option2 = document.createElement('option');
            option2.innerHTML = p.name;
            option2.value = p.uid;
            selector.appendChild(option2);
            document.getElementById('input-organizer').appendChild(option);
        })
        sortSelectOptionsByText(selector)
        sortSelectOptionsByText(document.getElementById('input-organizer'))
    }

    console.log(person)
}

if (selector) {
    selector.addEventListener('change', (person_) => {
        const person__ = get_name_by_uid(person_.target.value);
        const div = document.createElement('div');
        div.className = 'a-participant';
        const name = document.createElement('h4');
        name.className = 'participant-person';
        name.innerHTML = person__.name;
        name.dataset.uid = person__.uid;
        const remove = document.createElement('h4');
        remove.className = 'participant-remove';
        remove.innerHTML = '-'
        remove.addEventListener('click', () => {
            participants.removeChild(div);
            const option = document.createElement('option');
            option.value = person__.uid;
            option.textContent = person__.name;
            selector.appendChild(option);
            sortSelectOptionsByText(selector)
        })
        div.appendChild(name)
        div.appendChild(remove)
        participants.appendChild(div);

        selector.remove(selector.selectedIndex);

        selector.selectedIndex = 0;
    })
}

export function removeOptionSelct(selctor, uid) {
    let index = -1;
    let i = 0;
    Array.from(selctor.children).forEach(optionMember => {
        if(optionMember.value === uid) {
            index = i;
        }
        i++;
    })
    console.log(selctor.children[index])
    selctor.remove(index);
}

function sortSelectOptionsByText(selector) {
    const optionsArray = Array.from(selector.options);
    const [placeholder, ...realOptions] = optionsArray[0].value === "" ? optionsArray : [null, ...optionsArray];
    realOptions.sort((a, b) => a.textContent.localeCompare(b.textContent));
    selector.innerHTML = '';
    if (placeholder) selector.appendChild(placeholder);
    realOptions.forEach(option => selector.appendChild(option));
}

if (document.getElementById('new-person-add')) {
    document.getElementById('new-person-add').addEventListener('click', async () => {
        const result = await window.api.addpersonwindow();
        location.reload();
    })
}

export function get_name_by_uid(uid) {
    console.log(uid)
    return person.find(e => e.uid === uid);
}