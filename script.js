const initialData = [
    { id: 1, country: "США", ios: "55-60", android: "40-45" },
    { id: 2, country: "Китай", ios: "25-30", android: "70-75" },
    { id: 3, country: "Япония", ios: "60-65", android: "35-40" },
    { id: 4, country: "Германия", ios: "30-35", android: "65-70" },
    { id: 5, country: "Великобритания", ios: "50-55", android: "45-50" },
    { id: 6, country: "Индия", ios: "3-5", android: "95-97" },
    { id: 7, country: "Франция", ios: "30-35", android: "65-70" },
    { id: 8, country: "Бразилия", ios: "15-20", android: "80-85" },
    { id: 9, country: "Россия", ios: "20-25", android: "75-80" },
    { id: 10, country: "Италия", ios: "25-30", android: "70-75" },
    { id: 11, country: "Канада", ios: "55-60", android: "40-45" },
    { id: 12, country: "Южная Корея", ios: "20-25", android: "75-80" },
    { id: 13, country: "Австралия", ios: "55-60", android: "40-45" },
    { id: 14, country: "Испания", ios: "25-30", android: "70-75" },
    { id: 15, country: "Мексика", ios: "15-20", android: "80-85" },
    { id: 16, country: "Индонезия", ios: "15-20", android: "80-85" },
    { id: 17, country: "Турция", ios: "20-25", android: "75-80" },
    { id: 18, country: "Нидерланды", ios: "40-45", android: "55-60" },
    { id: 19, country: "Швеция", ios: "50-55", android: "45-50" },
    { id: 20, country: "Польша", ios: "20-25", android: "75-80" },
    { id: 21, country: "Аргентина", ios: "15-20", android: "80-85" },
    { id: 22, country: "ЮАР", ios: "10-15", android: "85-90" },
    { id: 23, country: "Нигерия", ios: "10-15", android: "85-90" },
    { id: 24, country: "Колумбия", ios: "15-20", android: "80-85" },
    { id: 25, country: "Малайзия", ios: "25-30", android: "70-75" },
    { id: 26, country: "Филиппины", ios: "15-20", android: "80-85" },
    { id: 27, country: "Египет", ios: "10-15", android: "85-90" },
    { id: 28, country: "Пакистан", ios: "5-10", android: "90-95" },
    { id: 29, country: "Таиланд", ios: "15-20", android: "80-85" },
    { id: 30, country: "Вьетнам", ios: "10-15", android: "85-90" },
    { id: 31, country: "Бангладеш", ios: "5-10", android: "90-95" },
    { id: 32, country: "Саудовская Аравия", ios: "35-40", android: "60-65" },
    { id: 33, country: "Иран", ios: "10-15", android: "85-90" },
    { id: 34, country: "Ирак", ios: "10-15", android: "85-90" },
    { id: 35, country: "Алжир", ios: "5-10", android: "90-95" },
    { id: 36, country: "Украина", ios: "15-20", android: "80-85" },
    { id: 37, country: "Марокко", ios: "5-10", android: "90-95" },
    { id: 38, country: "Судан", ios: "5-10", android: "90-95" },
    { id: 39, country: "Гана", ios: "10-15", android: "85-90" },
    { id: 40, country: "Кения", ios: "10-15", android: "85-90" },
    { id: 41, country: "Эфиопия", ios: "5-10", android: "90-95" },
    { id: 42, country: "Сингапур", ios: "40-45", android: "55-60" },
    { id: 43, country: "Шри-Ланка", ios: "5-10", android: "90-95" },
    { id: 44, country: "Узбекистан", ios: "5-10", android: "90-95" },
    { id: 45, country: "Чехия", ios: "20-25", android: "75-80" },
    { id: 46, country: "Беларусь", ios: "10-15", android: "85-90" },
    { id: 47, country: "Сирия", ios: "5-10", android: "90-95" },
    { id: 48, country: "Австрия", ios: "35-40", android: "60-65" },
    { id: 49, country: "Израиль", ios: "35-40", android: "60-65" },
    { id: 50, country: "Швейцария", ios: "40-45", android: "55-60" }
];
let data = [...initialData];
function updateTable() {
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";
    const filter = document.getElementById("countryFilter").value.toLowerCase();
    data.filter(item => item.country.toLowerCase().includes(filter)).forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.country}</td>
            <td><input type="text" value="${item.ios}" onchange="editData(${item.id}, 'ios', this.value)"></td>
            <td><input type="text" value="${item.android}" onchange="editData(${item.id}, 'android', this.value)"></td>
            <td><button onclick="deleteRow(${item.id})">Удалить</button></td>
        `;
        tbody.appendChild(row);
    });
}
function filterTable() {
    updateTable();
    updateCharts();
}
function updateCharts() {
    const labels = data.map(d => d.country);
    const iosData = data.map(d => parseFloat(d.ios.split("-")[0]));
    const androidData = data.map(d => parseFloat(d.android.split("-")[0]));
    const barChart = new Chart(document.getElementById("barChart"), {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                { label: "iOS (%)", data: iosData, backgroundColor: "#007BFF" },
                { label: "Android (%)", data: androidData, backgroundColor: "#28A745" }
            ]
        },
        options: { scales: { y: { beginAtZero: true, max: 100 } } }
    });
    const totalIOS = iosData.reduce((a, b) => a + b, 0) / iosData.length;
    const totalAndroid = androidData.reduce((a, b) => a + b, 0) / androidData.length;
    const pieChart = new Chart(document.getElementById("pieChart"), {
        type: "pie",
        data: {
            labels: ["iOS", "Android"],
            datasets: [{ data: [totalIOS, totalAndroid], backgroundColor: ["#007BFF", "#28A745"] }]
        }
    });
}
function editData(id, field, value) {
    const item = data.find(d => d.id === id);
    item[field] = value;
    updateCharts();
}
function deleteRow(id) {
    data = data.filter(d => d.id !== id);
    updateTable();
    updateCharts();
}

updateTable();
updateCharts();