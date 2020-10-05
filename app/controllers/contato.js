var ID_CONTATO_INC = 3;

var contatos = [
    { _id: 1, nome: 'Luiz Marinelli', email: 'marinelli.luiz@ifsp.edu.br' },
    { _id: 2, nome: 'Luiza Marinelli', email: 'marinelli.luiza@ifsp.edu.br' },
    { _id: 3, nome: 'Teste Marinelli', email: 'marinelli.teste@ifsp.edu.br' }
]

module.exports = function(app) {

    //Mongoose
    var Contato = app.models.contato;

    //alterado para o mongoose
    var controller = {};
    controller.listaContatos = function(req, res) {
        Contato.find().exec().then(
            function(contatos){
                res.json(contatos);
            },
            function(erro){
                console.error(erro);
                res.status(500).json(erro);
            }
        );
    };

    //alterado para o mongoose
    controller.obtemContato = function(req, res) {
        var _id = req.params.id;

        Contato.findById(_id).exec().then(
            function(contato){
                if(!contato) throw new Error('Contato não encontrado');
                res.json(contato);
            },
            function(erro){
                console.log(erro);
                res.status(404).json(erro);
            }
        );
    };

    //alterado para o mongoose
    controller.removeContato = function(req, res) {
        var _id = req.params.id;
        Contato.deleteOne({ "_id": _id }).exec().then(
            function(){
                res.end();
            },
            function(erro){
                return console.error(erro);
            }
        )
    };

    //alterado para o mongoose
    controller.salvaContato = function(req, res) {
        var _id = req.body._id;

        if(_id){
            Contato.findByIdAndUpdate(_id, req.body).exec().then(
                function(contato){
                    res.json(contato);
                },
                function(erro){
                    console.error(erro);
                    res.status(500).json(erro);
                }
            );
        } else {
            Contato.create(req.body).then(
                function(contato){
                    res.status(201).json(contato);
                },
                function(erro){
                    consolelog(erro);
                    res.status(500).json(erro);
                }
            );
        }
    };

    function adiciona(contatoNovo) {
        contatoNovo._id = ++ID_CONTATO_INC;;
        contatos.push(contatoNovo);
        return contatoNovo;
    }

    function atualiza(contatoAlterar) {
        contatos = contatos.map(function(contato) {
            if (contato._id == contatoAlterar._id) {
                contato = contatoAlterar;
            }
            return contato;
        });

        return contatoAlterar;
    }

    return controller;
};