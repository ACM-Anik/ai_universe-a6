const fetchData = (dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.data.tools, dataLimit));
};

const displayData = (data, dataLimit) => {
    // console.log(data);
    const container = document.getElementById('cards-container');
    container.innerHTML = "";
    // Display 6
    const showAll = document.getElementById('show-all');
    if (dataLimit && data.length > 6) {
        data = data.slice(0, 6);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }
    data.forEach(singleData => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="d-flex justify-center">
                <div class="card" style="width: 22rem; height: 500px">
                        <img class="p-3" src="${singleData.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h3 class="text- fw-semibold">Features</h3>
                        <ol class="list-decimal">
                            <li class="text-[#585858]">${singleData.features[0] ? singleData.features[0] : "Not Available"}</li>
                            <li class="text-[#585858]">${singleData.features[1] ? singleData.features[1] : "Not Available"}</li>
                            <li class="text-[#585858]">${singleData.features[2] ? singleData.features[2] : "Not Available"}</li>
                            <li class="text-[#585858]">${singleData.features[3] ? singleData.features[3] : "Not Available"}</li>
                        </ol>
                        <div class="justify-content-between align-items-center py-1">
                            <h3 class=" fw-semibold">${singleData.name}</h3>
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="fs-5"><i class="fas fa-calendar"></i> ${singleData.published_in}</p>
                                <a data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="fetchAIDetails('${singleData.id}')"><i class="fas fa-arrow-right text-danger"></i></a>
                            </div>                    
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(div);
        toggleSpinner(false);
    });
};

// Show More/All:
document.getElementById('btn-show-more').addEventListener('click', function () {
    fetchData();
    toggleSpinner(true);
});

// Spinner:
const toggleSpinner = isLoading =>{
    const spinner =document.getElementById('spinner');
    if(isLoading){
        spinner.classList.remove('d-none');
    }
    else{
        spinner.classList.add('d-none');
    }
};

// Data By Id:
const fetchAIDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayAIDetails(data.data.tools);
        console.log(data.data);
    }
    catch (error){
        alert('Please connect to the server!');
    }
};

const displayAIDetails = (data) =>{
    console.log(data);
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerText = `
        
    `;
};

