function start() { // Inicio da função start()
    

    const sonic = document.querySelector('#sonic');
    const crab = document.querySelector('#crab');
    const butterdroid = document.querySelector('#butterdroid');
    const robotnik = document.querySelector('#robotnik');
    const score = document.querySelector(".score");
    let count = 0;
    

    $("#inicio").hide();    

	
    let jogo = {};


    jogo.timer = setInterval(loop, 30);
	

	function loop() {
	
        crabCollision();
        butterdroidCollision();
        robotnikCollision() 

	} // Fim da função loop()
  
    
    // // Animação do pulo do sonic e de Abaixar

    document.onkeydown = teclado;

    function teclado(e) {

        
        if (e.keyCode == 83) { //representa a tecla de seta para baixo.
            
            
            sonic.src = './assets/img/sonic-down.png';
            sonic.style.width = '120px';
            sonic.style.height = '90px';
            sonic.style.bottom = '50px';
            

            document.onkeyup = teclado = () => { // Faz o sonic voltar a posição de pé ao soltar a tecla de seta para baixo.
                (e.keyCode == 83)
                    sonic.src = './assets/img/sonic.gif';
                    sonic.style.width = '180px';
                    sonic.style.height = '180px'; 
                    sonic.style.bottom = '20px';               
       
            }
        }
        else if (e.keyCode == 87) { //representa a tecla tab. 

            sonic.src = './assets/img/girando.gif';
            sonic.style.width = '180px';
            sonic.style.height = '180px';
            

            document.onkeyup = teclado = () => { // Faz o sonic voltar a posição de pé ao soltar a tecla de seta para baixo.
                (e.keyCode == 83)
                    sonic.src = './assets/img/sonic.gif';
                    sonic.style.width = '180px';
                    sonic.style.height = '180px';          
       
            }
            
            
            somJump.play()
            if(sonic.classList !='jump'){ 
                sonic.classList.add('jump')
            };
            setTimeout(function() {
            sonic.classList.remove('jump')
            }, 1100);
            
        }
        
    }

    
    function sortear()
{
//fazemos um sorteio entre 1 e 2, qual for sorteado, executa um dos if/else
var nn = Math.floor(Math.random() * (2 - 1 + 1) + 1);
	if(nn == 1){ 
	document.getElementById("crab").style.display = 'block';
	document.getElementById("butterdroid").style.display = 'none';
	}
	else
	{
	document.getElementById("crab").style.display = 'none';
	document.getElementById("butterdroid").style.display = 'block';
	}
}
sortear();

setInterval(function(){sortear()},4000);

    // Colisão com o crab

    function crabCollision() {
        
        const crabPosition = crab.offsetLeft;
        const sonicPosition = +window.getComputedStyle(sonic).bottom.replace('px' , '')  
        //Utilizei o getComputedStyle, para poder pegar o style bottom, usei o replace para retirar o 'px' e o '+' na frente do window para converter a string em number

        if (crabPosition <= 100 && crabPosition > 0 && sonicPosition < 75) {
            
            crab.style.animation = 'none';
            crab.style.left = `${crabPosition}px`;
          

            sonic.style.animation = 'none';
            sonic.style.bottom = `${sonicPosition}px`; // Fazendo o sonic parar na posição onde bateu no crab.
            
            
            gameOver()
            
            
        }
        
    }

    function robotnikCollision() {
        
        const robotnikPosition = robotnik.offsetLeft;
        const sonicPosition = +window.getComputedStyle(sonic).bottom.replace('px' , '')  
        //Utilizei o getComputedStyle, para poder pegar o style bottom, usei o replace para retirar o 'px' e o '+' na frente do window para converter a string em number

        if (robotnikPosition <= 100 && robotnikPosition > 0 && sonicPosition < 75) {
            
            robotnik.style.animation = 'none';
            robotnik.style.left = `${robotnikPosition}px`;
          

            sonic.style.animation = 'none';
            sonic.style.bottom = `${sonicPosition}px`; // Fazendo o sonic parar na posição onde bateu no robotnik.
            
            
            gameOver()
            
            
        }
        
    }
    // Colisão com o butterdroid

    function butterdroidCollision() {
        const butterdroidPosition = butterdroid.offsetLeft;
        const sonicPosition = +window.getComputedStyle(sonic).height.replace('px' , '')
        const sonicPositionUp = +window.getComputedStyle(sonic).bottom.replace('px' , '')  
        //Utilizei o getComputedStyle, para poder pegar o style height e o bottom, usei o replace para retirar o 'px' e o '+' na frente dowindow para converter a string em number

        if (butterdroidPosition <= 90 && butterdroidPosition > 0 && sonicPosition > 115 && sonicPositionUp < 170) {

            butterdroid.style.animation = 'none';
            butterdroid.style.left = `${butterdroidPosition}px`;

            sonic.style.animation = 'none';
            sonic.style.bottom = `${sonicPositionUp}px`; // Fazendo o sonic parar na posição onde bateu no butterdroid.

            
            
            gameOver()
            
        }
 
    }


    //Música do jogo
    let musica = document.getElementById("musica");
    let somJump = document.getElementById("somJump");
    let somGameOver = document.getElementById("gameOver");
    

    //Música em loop
    musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
    musica.play();

    // score do jogo
    setInterval(()=> {                    
        count++;
        score.innerHTML = `${count}`;
    }, 100);



    //Função GAME OVER
    function gameOver() {

        
        musica.pause();
        somGameOver.play();
        window.clearInterval(jogo.timer);    
        pontuação()
    }

    function pontuação () {
       
        if (gameOver) {
            alert(`Game Over! Seu score foi: ${count} \nQuer tentar outra vez?`);
            location.reload();
        }
    }
   
    
    
} //Fim da função reiniciaJogo