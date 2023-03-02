const fetchData = (dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.data.tools, dataLimit));
}

const displayData = (data, dataLimit) => {
    // console.log(data);
    const container = document.getElementById('cards-container');
    container.innerHTML = "";
    // Display 6
    const showAll = document.getElementById('show-all');
    if (dataLimit && data.length > 6) {
        data = data.slice(0, 6);
        showAll.classList.remove('hidden');
    }
    else {
        showAll.classList.add('hidden');
    }


    data.forEach(singleData => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="flex justify-center">
                <div class="card card-compact w-80 md:w-96 bg-base-100 shadow-xl">
                    <figure>
                        <img class="md:h-[260px] w-full p-5 rounded" src="${singleData.image}" alt="" />
                    </figure>
                    <div class="card-body">
                        <h2 class="text-xl font-bold">Features</h2>
                        <ol class="list-decimal ml-4">
                            <li class="text-[#585858]">${singleData.features[0] ? singleData.features[0] : "Not Available"}</li>
                            <li class="text-[#585858]">${singleData.features[1] ? singleData.features[1] : "Not Available"}</li>
                            <li class="text-[#585858]">${singleData.features[2] ? singleData.features[2] : "Not Available"}</li>
                            <li class="text-[#585858]">${singleData.features[3] ? singleData.features[3] : "Not Available"}</li>
                        </ol>
                        <div class="card-actions justify-between items-center border-t border-[#585858] py-3">
                            <div>
                                <h3 class="text-xl font-bold">${singleData.name}</h3>
                                <p class="text-base"><i class="fas fa-calendar"></i> ${singleData.published_in}</p>
                            </div>                    
                            <label for="my-modal-3" class="text-2xl mt-5" onclick="fetchAIDetails('${singleData.id}')"><i class="fas fa-arrow-right text-[#EB5757]"></i></label>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(div);
        toggleSpinner(false);
    });
}

document.getElementById('btn-show-more').addEventListener('click', function () {
    fetchData();
    toggleSpinner(true);
});

const toggleSpinner = isLoading =>{
    const spinner =document.getElementById('spinner');
    if(isLoading){
        spinner.classList.remove('hidden');
    }
    else{
        spinner.classList.add('hidden');
    }
}








// <p class="text-[#585858]">${singleData.}</p>
// <p class="text-[#585858]">Price:${singleData.}</p>
// <p class="text-[#585858] mb-5"> Quantity:${singleData.}</p>