class CentralDeLuzes {
    static instance;

    constructor() {
        if (CentralDeLuzes.getInstance()) {
            return CentralDeLuzes.getInstance();
        }
        CentralDeLuzes.instance = this;

        document.querySelectorAll(`.comodo`)
            .forEach(comodoEl => this.addComodo(comodoEl));
    }


    static getInstance() {
        return CentralDeLuzes.instance;
    }


    addComodo(comodoEl) {
        const id = comodoEl.id;
        const tituloEl = comodoEl.querySelector('.comodo-titulo');
        if (!tituloEl) throw new Error(`Elemento ${id} necessita de um título.`);

        const nome = tituloEl.innerHTML;

        const buttonEl = document.querySelector(`[data-comodo="${id}"]`);
        if (!buttonEl) throw new Error(`Não foi possível associar ${nome} a um botão.`);

        buttonEl.addEventListener('click', () => {
            if (!comodoEl.classList.contains('active'))
                this.ligar({ nome, comodoEl })
            else
                this.desligar({ nome, comodoEl })
        })
    }


    ligar(comodo) {
        comodo.comodoEl.classList.add('active');
        alert(`Luz do ${comodo.nome} ligada`);
    }


    desligar(comodo) {
        comodo.comodoEl.classList.remove('active');
        alert(`Luz do ${comodo.nome} desligada`);
    }
}


const centralDeLuzes = new CentralDeLuzes();