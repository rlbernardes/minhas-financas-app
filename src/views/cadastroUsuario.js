import React from 'react';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import { withRouter } from 'react-router-dom';
import UsuarioService from '../app/service/usuarioService';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

class CadastroUsuario extends React.Component {
  constructor() {
    super();
    this.service = new UsuarioService();
  }

  state = {
    nome: '',
    email: '',
    senha: '',
    senhaRepeticao: '',
  };

  encaminharLogin = () => {
    this.props.history.push('/login');
    window.location.reload(false);
  };

  cadastrar = () => {
    const msgs = this.validar();

    if (msgs && msgs.length > 0) {
      msgs.forEach((msg, index) => {
        mensagemErro(msg);
      });
      return false;
    }

    const usuario = {
      nome: this.state.nome,
      email: this.state.email,
      senha: this.state.senha,
    };

    this.service
      .salvar(usuario)
      .then((response) => {
        mensagemSucesso(
          'Usuário cadastrado com sucesso! Faça o login para acessar o sistema.'
        );
        this.encaminharLogin();
      })
      .catch((erro) => {
        mensagemErro(erro.response.data);
      });
  };

  validar() {
    const msgs = [];

    if (!this.state.nome) {
      msgs.push('O campo Nome é obrigatório');
    }

    if (!this.state.email) {
      msgs.push('O campo Email é obrigatório');
    } else if (!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+.[a-z]/)) {
      msgs.push('Informe um Email válido');
    }

    if (!this.state.senha || !this.state.senhaRepeticao) {
      msgs.push('Digite a senha 2x.');
    } else if (this.state.senha !== this.state.senhaRepeticao) {
      msgs.push('As senhas não batem.');
    }
    return msgs;
  }

  render() {
    return (
      <Card title="Cadastro de Usuário">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <fieldset>
                <FormGroup label="Nome: *" htmlFor="inputNome">
                  <input
                    type="text"
                    value={this.state.nome}
                    onChange={(e) => this.setState({ nome: e.target.value })}
                    className="form-control"
                    id="inputNome"
                    name="nome"
                    placeholder="Digite o Nome"
                  />
                </FormGroup>
                <FormGroup label="Email: *" htmlFor="inputEmail">
                  <input
                    type="email"
                    nome="email"
                    value={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                    className="form-control"
                    id="inputEmail"
                    aria-describedby="emailHelp"
                    placeholder="Digite o Email"
                  />
                </FormGroup>
                <FormGroup label="Senha: *" htmlFor="inputSenha">
                  <input
                    type="password"
                    nome="senha"
                    value={this.state.senha}
                    onChange={(e) => this.setState({ senha: e.target.value })}
                    className="form-control"
                    id="inputSenha"
                    placeholder="Digete uma Senha"
                  />
                </FormGroup>
                <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                  <input
                    type="password"
                    nome="repitaSenha"
                    value={this.state.senhaRepeticao}
                    onChange={(e) =>
                      this.setState({ senhaRepeticao: e.target.value })
                    }
                    className="form-control"
                    id="inputRepitaSenha"
                    placeholder="Repita a Senha"
                  />
                </FormGroup>
                <br />
                <button
                  onClick={this.cadastrar}
                  type="button"
                  className="btn btn-success"
                >
                  Salvar
                </button>
                <button
                  onClick={this.encaminharLogin}
                  type="button"
                  className="btn btn-danger"
                >
                  Cancelar
                </button>
              </fieldset>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default withRouter(CadastroUsuario);
