/*PP.5.3. Baseando-se no código-fonte do exemplo fornecido pelo professor, que simula um círculo movendo-se na tela com velocidade formando um determinado ângulo com os eixos de coordenadas, desenvolva uma simulação de “gotas de chuva” que aparecem a partir da extremidade superior da tela e caem a partir de pontos pseudoaleatórios superiores. Num determinado instante, devem surgir simultaneamente de 10 a 100 gotas de chuva por vez. 
*/

let velocity_screen = document.getElementById('velocity_screen') as HTMLCanvasElement;
const simulation_context = velocity_screen.getContext('2d') as CanvasRenderingContext2D;

function draw_object(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, center: number[], radius: number) {
    let centerX = Math.floor(center[0]);
    let centerY = Math.floor(center[1]);
    let r = radius;
    context.beginPath();
    context.arc(centerX, centerY, r, 0, 2 * Math.PI, false);
    context.fillStyle = 'blue'; // Cor da gota de chuva
    context.fill();
}

function update_coord(coords: number[], v: number[], t: number) {
    coords[0] = Math.floor(coords[0] + v[0] * t);
    coords[1] = Math.floor(coords[1] + v[1] * t);
}

let start_button = document.getElementById('start_button') as HTMLButtonElement;
start_button.onclick = function () {
    let velocity_input = document.getElementById("vel") as HTMLInputElement;
    let velocity = parseFloat(velocity_input.value);

    let numDrops = Math.floor(Math.random() * (100 - 10 + 1)) + 10; // Número aleatório de gotas entre 10 e 100
    let drops: { center: number[], velocity: number[], time: number }[] = [];

    for (let i = 0; i < numDrops; i++) {
        let center: number[] = [Math.random() * velocity_screen.width, Math.random() * velocity_screen.height];
        let v: number[] = [0, velocity]; // Ângulo fixo em 90 graus
        let t: number = 0;
        drops.push({ center, velocity: v, time: t });
    }

    let r: number = 2; // Raio da gota de chuva
    let dt: number = 30; // Intervalo de tempo (ms)

    setInterval(function () {
        simulation_context.clearRect(0, 0, velocity_screen.width, velocity_screen.height);

        for (let i = 0; i < numDrops; i++) {
            let drop = drops[i];
            drop.time = (drop.time + dt) / dt;
            update_coord(drop.center, drop.velocity, drop.time);
            draw_object(velocity_screen, simulation_context, drop.center, r);
        }
    }, dt);
};
