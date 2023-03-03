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
                <div class="card shadow-lg border-0" style="width: 22rem; height: 500px">
                        <img src="${singleData.image}" style="height: 200px" class="card-img-top p-3" alt="...">
                    <div class="card-body">
                        <h4 class="fw-semibold">Features</h4>
                        <ol class="list-decimal ps-3">
                            <li class="text-[#585858]">${singleData.features[0] ? singleData.features[0] : "Not Available"}</li>
                            <li class="text-[#585858]">${singleData.features[1] ? singleData.features[1] : "Not Available"}</li>
                            <li class="text-[#585858]">${singleData.features[2] ? singleData.features[2] : "Not Available"}</li>
                            <li class="text-[#585858]">${singleData.features[3] ? singleData.features[3] : "Not Available"}</li>
                        </ol>
                        <div class="justify-content-between align-items-center py-1 border-top">
                            <h4 class=" fw-semibold">${singleData.name}</h4>
                            <div class="d-flex justify-content-between align-items-center">
                                <p class=""><i class="fas fa-calendar"></i> ${singleData.published_in}</p>
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


// Fetch Data By Id:
const fetchAIDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
        const res = await fetch(url);
        const data = await res.json();
        displayAIDetails(data.data);
        // console.log(data.data);
};

// Display Data By Id:
const displayAIDetails = (data) =>{
    console.log(data);
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
        <div class="col-md-6 border border-danger rounded p-3 shadow" style="background-color: rgb(249, 227, 227)">
        <h5 class="fw-semibold">${data.description}</h5>
        <div class="d-flex justify-content-center g-3 mt-3">
                <p class="bg-white p-2 mx-2 rounded">$10/month Basic</p>
                <p class="bg-white p-2 mx-2 rounded">$10/month <br> Basic</p>
                <p class="bg-white p-2 mx-2 rounded">$10/month <br> Basic</p>
            </div>
            <div class="d-flex justify-content-between">
                <div>
                    <h4 class="">Features</h4>
                    <ul class="ps-3">
                        <li>${data.features ? data.features['1'].feature_name : "Not available"}</li>
                        <li>${data.features ? data.features['2'].feature_name : "Not available"}</li>
                        <li>${data.features ? data.features['3'].feature_name : "Not available"}</li>
                    </ul>
                </div>
                <div>
                    <h4 class="">Integrations</h4>
                    <ul class="ps-3">
                        <li>${data.integrations ? data.integrations[0] : "Not available"}</li>
                        <li>${data.integrations ? data.integrations[1] : "Not available"}</li>
                        <li>${data.integrations ? data.integrations[2] : "Not available"}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card shadow" style="width: 22rem;">
                <img src="${data.image_link[0]}" class="card-img-top p-3" alt="...">
                <div class="card-body">
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                
            </div>
            </div>
        </div>
    `;
};

