let chart;

function atualizarGrafico() {
    const canvas = document.getElementById('meuGrafico');
    if (!canvas) return; // Segurança caso o elemento suma

    const a = parseFloat(document.getElementById('coefA').value) || 0;
    const b = parseFloat(document.getElementById('coefB').value) || 0;

    const xValues = [];
    const yValues = [];
    for (let x = -10; x <= 10; x++) {
        xValues.push(x);
        yValues.push(a * x + b);
    }

    if (chart) {
        chart.data.labels = xValues;
        chart.data.datasets[0].data = yValues;
        chart.update('none'); // Atualiza sem animação para ser instantâneo
    } else {
        const ctx = canvas.getContext('2d');
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: xValues,
                datasets: [{
                    label: 'Resultado de f(x)',
                    data: yValues,
                    borderColor: '#4b6cb7',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: false }
                }
            }
        });
    }
}

// Garante que o gráfico só carregue quando a página estiver 100% pronta
window.onload = atualizarGrafico;

// Função para trocar de abas
function abrirAba(evt, nomeAba) {
    const contents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < contents.length; i++) {
        contents[i].style.display = "none";
    }

    const btns = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < btns.length; i++) {
        btns[i].classList.remove("active");
    }

    document.getElementById(nomeAba).style.display = "block";
    evt.currentTarget.classList.add("active");
}

// Lógica do Tema Escuro
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    // Salva a preferência do usuário
    const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

// Aplica o tema salvo ao carregar
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
}