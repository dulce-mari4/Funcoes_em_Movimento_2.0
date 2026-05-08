// Coloque isso dentro da sua tag <script>
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