let amRoutine = [];
let pmRoutine = [];

const conflicts = {
    'retinol': ['aha-toner', 'vitamin-c', 'salicylic'],
    'vitamin-c': ['retinol', 'aha-toner', 'salicylic'],
    'aha-toner': ['retinol', 'vitamin-c', 'salicylic'],
    'salicylic': ['retinol', 'vitamin-c', 'aha-toner']
};

const productSelect = document.getElementById('product-select');
const timeSelect = document.getElementById('time-select');
const addBtn = document.getElementById('add-btn');
const amList = document.getElementById('am-list');
const pmList = document.getElementById('pm-list');
const alertBox = document.getElementById('alert-box');

addBtn.addEventListener('click', () => {
    const selectedProduct = productSelect.value;
    const selectedTime = timeSelect.value;

    if (selectedProduct === '') {
        alert('Please choose a product first!');
        return;
    }

    const currentRoutine = (selectedTime === 'am') ? amRoutine : pmRoutine;

    if (conflicts[selectedProduct]) {
        const conflictingItems = conflicts[selectedProduct];
        for (let item of currentRoutine) {
            if (conflictingItems.includes(item)) {
                // CHANGED: Formats beautiful alert text layouts with dynamic Lucide error icons
                alertBox.innerHTML = `<i data-lucide="alert-triangle" class="w-5 h-5 text-rose-500 shrink-0"></i> <span><strong>Layering Conflict:</strong> You can't combine ${selectedProduct.replace('-', ' ')} with ${item.replace('-', ' ')} in the same slot.</span>`;
                alertBox.classList.remove('hidden');
                lucide.createIcons(); // Refreshes newly added icons
                return; 
            }
        }
    }

    alertBox.classList.add('hidden');
    alertBox.textContent = '';
        
    if (currentRoutine.includes(selectedProduct)) {
        alertBox.textContent = `⚠️ Notification: "${productSelect.options[productSelect.selectedIndex].text}" is already in your routine!`;
        alertBox.classList.remove('hidden');
        return; 
    }

    currentRoutine.push(selectedProduct);

    const listItem = document.createElement('li');
    listItem.className = "bg-white p-2 rounded shadow-sm flex justify-between items-center text-sm border border-gray-100";

    const cleanProductName = productSelect.options[productSelect.selectedIndex].text;
    
    const textSpan = document.createElement('span');
    textSpan.textContent = cleanProductName;
    listItem.appendChild(textSpan);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.className = "text-xs hover:scale-125 transition ml-2 focus:outline-none";
    
    deleteBtn.addEventListener('click', () => {
        if (selectedTime === 'am') {
            amRoutine = amRoutine.filter(item => item !== selectedProduct);
        } else {
            pmRoutine = pmRoutine.filter(item => item !== selectedProduct);
        }
        listItem.remove();
    });

    listItem.appendChild(deleteBtn);

    if (selectedTime === 'am') {
        amList.appendChild(listItem);
    } else {
        pmList.appendChild(listItem);
    }
});

// Clear Board Action Handler
const clearBtn = document.getElementById('clear-btn');
clearBtn.addEventListener('click', () => {
    // Empty state memory tracking logic
    amRoutine = [];
    pmRoutine = [];
    
    // Clear elements from display lists
    amList.innerHTML = '';
    pmList.innerHTML = '';
    
    // Reset alert warning layouts
    alertBox.classList.add('hidden');
    alertBox.textContent = '';
});

