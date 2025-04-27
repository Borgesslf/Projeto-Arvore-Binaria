const readline = require('readline');

class Arvore {
    constructor(info = 0) {
        this.info = info;
        this.sae = null;
        this.sad = null;
    }

    insere(n) {
        if (this.info === 0) {
            this.info = n;
            return;
        }
        if (n <= this.info) {
            if (this.sae === null) {
                this.sae = new Arvore(n);
            } else {
                this.sae.insere(n);
            }
        } else {
            if (this.sad === null) {
                this.sad = new Arvore(n);
            } else {
                this.sad.insere(n);
            }
        }
    }

    pesquisa(n) {
        if (this.info === n) {
            return true;
        }
        if (n < this.info && this.sae !== null) {
            return this.sae.pesquisa(n);
        } else if (n > this.info && this.sad !== null) {
            return this.sad.pesquisa(n);
        }
        return false;
    }

    remove(n) {
        if (this === null) return this;

        if (n < this.info) {
            if (this.sae !== null) this.sae = this.sae.remove(n);
        } else if (n > this.info) {
            if (this.sad !== null) this.sad = this.sad.remove(n);
        } else {
            if (this.sae === null && this.sad === null) {
                return null;
            } else if (this.sae === null) {
                return this.sad;
            } else if (this.sad === null) {
                return this.sae;
            } else {
                let sucessor = this.sad._minimo();
                this.info = sucessor;
                this.sad = this.sad.remove(sucessor);
            }
        }
        return this;
    }

    _minimo() {
        let atual = this;
        while (atual.sae !== null) {
            atual = atual.sae;
        }
        return atual.info;
    }

    mostraArvore(prefix = '') {
        let leftPrefix = prefix + "Esquerda -> ";
        let rightPrefix = prefix + "Direita -> ";

        console.log(prefix + this.info);

        if (this.sae !== null) {
            this.sae.mostraArvore(leftPrefix);
        }

        if (this.sad !== null) {
            this.sad.mostraArvore(rightPrefix);
        }
    }

    maiorNivel(nivelAtual = 0) {
        let maiorNivelAtual = nivelAtual;

        if (this.sae !== null) {
            maiorNivelAtual = Math.max(maiorNivelAtual, this.sae.maiorNivel(nivelAtual + 1));
        }

        if (this.sad !== null) {
            maiorNivelAtual = Math.max(maiorNivelAtual, this.sad.maiorNivel(nivelAtual + 1));
        }

        return maiorNivelAtual;
    }
}

class Programa {
    constructor() {
        this.RAIZ = null;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    insereElementos() {
        const elementos = [50, 40, 35, 38, 37, 45, 42, 47, 43, 60, 52, 56, 54, 65, 61, 62, 80, 90];
        for (let i = 0; i < elementos.length; i++) {
            let arv = new Arvore();
            arv.insere(elementos[i]);
            if (this.RAIZ === null) {
                this.RAIZ = arv;
            } else {
                this.RAIZ.insere(elementos[i]);
            }
        }
    }

    menu() {
        this.rl.question('Escolha uma opção:\n' +
            '1 - Inserir um elemento\n' +
            '2 - Pesquisar um elemento\n' +
            '3 - Lista em Pré-Ordem\n' +
            '4 - Lista em Ordem Simétrica\n' +
            '5 - Lista em Pós-Ordem\n' +
            '6 - Lista em Ordem\n' +
            '7 - Calcular Maior Nível\n' +
            '8 - Remover um elemento\n' +
            '9 - Sair\n', (escolha) => {

            switch (parseInt(escolha)) {
                case 1:
                    this.rl.question("Digite um número para inserir: ", (n) => {
                        let arv = new Arvore();
                        arv.insere(parseInt(n));
                        if (this.RAIZ === null) {
                            this.RAIZ = arv;
                        } else {
                            this.RAIZ.insere(parseInt(n));
                        }
                        this.menu();
                    });
                    break;

                case 2:
                    this.rl.question("Digite um número para pesquisar: ", (n) => {
                        if (this.RAIZ.pesquisa(parseInt(n))) {
                            console.log("Número encontrado na árvore.");
                        } else {
                            console.log("Número não encontrado.");
                        }
                        this.menu();
                    });
                    break;

                case 3:
                    console.log("Árvore em Pré-Ordem:");
                    this.RAIZ.mostraArvore();
                    this.menu();
                    break;

                case 4:
                    console.log("Árvore em Ordem Simétrica:");
                    this.RAIZ.mostraArvore();
                    this.menu();
                    break;

                case 5:
                    console.log("Árvore em Pós-Ordem:");
                    this.RAIZ.mostraArvore();
                    this.menu();
                    break;

                case 6:
                    console.log("Árvore em Ordem:");
                    this.RAIZ.mostraArvore();
                    this.menu();
                    break;

                case 7:
                    let maiornivel = this.RAIZ.maiorNivel(0);
                    console.log("Maior nível da árvore: " + maiornivel);
                    this.menu();
                    break;

                case 8:
                    this.rl.question("Digite o número para remover: ", (n) => {
                        this.RAIZ = this.RAIZ.remove(parseInt(n));
                        console.log(`Número ${n} removido com sucesso, se existir.`);
                        this.menu();
                    });
                    break;

                case 9:
                    console.log("Saindo...");
                    this.rl.close();
                    break;

                default:
                    console.log("Opção inválida. Tente novamente.");
                    this.menu();
                    break;
            }
        });
    }
}

let programa = new Programa();
programa.insereElementos();
programa.menu();
