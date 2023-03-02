const fetchData = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.data.tools));
}

const displayData = (data) => {
    // console.log(data);
    const container = document.getElementById('cards-container');
    data.forEach(singleData => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="flex justify-center">
                <div class="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure>
                        <img class="h-[260px] w-full p-5 rounded" src="${singleData.image}" alt="" />
                    </figure>
                    <div class="card-body">
                        <h2 class="text-xl font-bold">Features</h2>
                        <ol>
                            <li class="text-[#585858]">${singleData.features[0] ? singleData.features[0] : "Not Available"}</li>
                            <li class="text-[#585858]">${singleData.features[1] ? singleData.features[1] : "Not Available"}</li>
                            <li class="text-[#585858]">${singleData.features[2] ? singleData.features[2] : "Not Available"}</li>
                            <li class="text-[#585858]">${singleData.features[3] ? singleData.features[3] : "Not Available"}</li>
                        </ol>
                        <div class="card-actions justify-between items-center border-t border-[#585858] py-3">
                            <div>
                                <h3 class="text-xl font-bold">${singleData.name}</h3>
                                <p class="text-base">Date:${singleData.published_in}</p>
                            </div>
                            <button id="" class="text-2xl rounded mt-5"><i class="fas fa-arrow-right text-[#EB5757]"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}
fetchData();


// <p class="text-[#585858]">${singleData.}</p> 
// <p class="text-[#585858]">Price:${singleData.}</p>
// <p class="text-[#585858] mb-5"> Quantity:${singleData.}</p>