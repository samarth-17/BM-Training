document.addEventListener('DOMContentLoaded', () => {
    const draggableList = document.getElementById('draggable-list');
    let itemBeingDragged = null;


    draggableList.addEventListener('dragstart', (event) => {
        itemBeingDragged = event.target;
        event.target.style.opacity = '0.4'; 
    });


    draggableList.addEventListener('dragend', (event) => {
        event.target.style.opacity = '1'; // Reset opacity after dragging
    });


    draggableList.addEventListener('dragover', (event) => {
        event.preventDefault(); 
        const itemAfterCursor = getItemAfterCursor(draggableList, event.clientY);


        if (itemAfterCursor == null) {
            draggableList.appendChild(itemBeingDragged);
        } else {
            draggableList.insertBefore(itemBeingDragged, itemAfterCursor);
        }
    });

    const getItemAfterCursor = (container, yPosition) => {
        const draggableItems = [...container.querySelectorAll('li:not(.dragging)')];

        return draggableItems.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = yPosition - box.top - box.height / 2;


            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    };
});