// console.log('everything okay');

const fetchData = () => {
    const url =`https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.data.tools));
}

const displayData = (data) =>{
    // console.log(data);
    
}
fetchData();