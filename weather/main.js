function setupCounter() {
    const counterButton = document.getElementById('counter');
    let counter = 0;
    
    const setCounter = (count) => {
        counter = count;
        counterButton.innerHTML = `count is ${counter}`;
    };
    
    counterButton.addEventListener('click', () => setCounter(counter + 1));
    setCounter(0);
}

setupCounter();