const fetchData = (dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
        .then(res => res.json())
        .then(data =>{
            if(data?.status){
               displayData(data.data.tools, dataLimit); 
            }else{
                alert('Please Connect To Server.');
            }
        });          
};

const displayData = (data, dataLimit) => {
    // console.log(data, dataLimit);
    const container = document.getElementById('cards-container');
    container.innerHTML = "";
    
    // Display 6 data:
    const showAll = document.getElementById('show-all');
    if (dataLimit && data.length > 6) {
        data = data.slice(0, 6);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }
    
    // // Sort Handler:
    // document.getElementById('btn-sort').addEventListener('click', function (){
    //     cardsSort(data);
    // });
    
    data.forEach((e) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="d-flex justify-center">
                <div class="card shadow-lg border-0" style="width: 22rem; height: 500px">
                        <img src="${e.image}" style="height: 200px" class="card-img-top p-3" alt="...">
                    <div class="card-body">
                        <h4 class="fw-semibold">Features</h4>
                        <ol class="list-decimal ps-3">
                            <li class="fw-semibold text-secondary">${e.features[0] ? e.features[0] : "Not Available"}</li>
                            <li class="fw-semibold text-secondary">${e.features[1] ? e.features[1] : "Not Available"}</li>
                            <li class="fw-semibold text-secondary">${e.features[2] ? e.features[2] : "Not Available"}</li>
                            <li class="fw-semibold text-secondary">${e.features[3] ? e.features[3] : "Not Available"}</li>
                        </ol>
                        <div class="justify-content-between align-items-center py-1 border-top">
                            <h4 class=" fw-semibold">${e.name}</h4>
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="fw-semibold text-secondary"><i class="fas fa-calendar"></i> ${e.published_in}</p>
                                <a class="p-3 fs-5 fw-bold" data-bs-toggle="modal" data-bs-target="#detailsModal" onclick="fetchAIDetails('${e.id}')"><i class="fas fa-arrow-right text-danger"></i></a>
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


// // Sort By Date:
const cardsSort = (array) => {
    array.sort((a, b) => {
        const dateA = new Date(a.published_in);
        const dateB = new Date(b.published_in);
        return dateB - dateA;
    });
    displayData(array);   
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
    // console.log(data);
    const modalContainer = document.getElementById('modal-container');
    const {accuracy} = data;
    const score = accuracy.score;
    const percentage = score * 100 + "% Accuracy";  
    
    modalContainer.innerHTML = `
        <div class="col-md-6 border border-danger rounded p-3 shadow" style="background-color: rgb(249, 227, 227)">
        <h5 class="fw-semibold">${data.description }</h5>
        <div class="d-flex justify-content-center g-3 mt-3">
                <p class="fs-6 bg-white text-success p-2 mx-2 rounded" style="height: 85px">${data.pricing === null?" Free Of Cost/Basic" : data.pricing[0].price}</p>
                <p class="fs-6 bg-white text-warning p-2 mx-2 rounded" style="height: 85px">${data.pricing === null ? "Free Of Cost/Pro" : data.pricing[1].price}</p>
                <p class="fs-6 bg-white text-danger p-2 mx-2 rounded" style="height: 85px">${data.pricing === null ? "Free Of Cost/Enterprise" : data.pricing[2].price}</p>
            </div>
            <div class="d-flex justify-content-between">
                <div>
                    <h4 class="fw-bold">Features</h4>
                    <ul class="ps-3">
                        <li>${data.features['1'] ? data.features['1'].feature_name : "No Data Found"}</li>
                        <li>${data.features['2'] ? data.features['2'].feature_name : "No Data Found"}</li>
                        <li>${data.features['3'] ? data.features['3'].feature_name : "No Data Found"}</li>
                    </ul>
                </div>
                <div>
                    <h4 class="fw-bold">Integrations</h4>
                    <ul class="ps-3">
                        <li>${data.integrations === null ? "No Data Found" : data.integrations[0]}</li>
                        <li>${data.integrations === null ? "No Data Found" : data.integrations[1]}</li>
                        <li>${data.integrations === null ? "No Data Found" : data.integrations[2]}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-md-6 px-2">
            <div class="card shadow" style="width: 22rem; height: 28rem">
                <img src="${data.image_link[0] ? data.image_link[0] : "Image Didn't Found"}" class="card-img-top p-3" style="height: 260px" alt="...">
                <div class="card-body">
                    <h5 class="fw-bold">${data.input_output_examples === null ? "Can You Give Any Example?" : data.input_output_examples[0].input}</h5>
                    <p >${data.input_output_examples === null? "No! Not Yet! Take A Break." : data.input_output_examples[0].output.slice(0, 173)}</p>
                </div>
                <div class="d-flex justify-content-end relative">
                    <button class="btn btn-danger position-absolute top-0 end-0 ${data.accuracy.score? "m-0" : "d-none"}">${percentage}</button>
                </div>
            </div>
        </div>
    `;
};


