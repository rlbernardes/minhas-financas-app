import React from 'react';
import { withRouter } from 'react-router-dom';
import LocalStorageService from '../../app/service/localstorageService';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu';
import LancamentoService from './lancamentoService';
import LancamentosTable from './lancamentosTable';
import { mensagemErro, mensagemSucesso } from '../../components/toastr';
import { Button } from 'primereact/button';

import { Dialog } from 'primereact/dialog';

import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons

class ConsultaLancamentos extends React.Component {
  constructor() {
    super();
    this.service = new LancamentoService();
  }

  state = {
    ano: '',
    mes: '',
    tipo: '',
    descricao: '',
    status: '',
    lancamentos: [],
    showConfirmDialog: false,
    lancamentoDeletar: {},
  };

  buscar = () => {
    if (!this.state.ano) {
      mensagemErro('O preenchimento do campo ano é obrigatório');
      return false;
    }

    const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

    const lancamentoFiltro = {
      ano: this.state.ano,
      mes: this.state.mes,
      tipo: this.state.tipo,
      descricao: this.state.descricao,
      status: this.state.status,
      usuario: usuarioLogado.id,
    };
    this.service
      .consultar(lancamentoFiltro)
      .then((resposta) => {
        this.setState({ lancamentos: resposta.data });
      })
      .catch((error) => {
        mensagemErro(error.response.data);
      });
  };

  editar = (id) => {
    console.log('editar', id);
  };
  abrirConfirmacao = (lancamento) => {
    this.setState({ showConfirmDialog: true, lancamentoDeletar: lancamento });
  };
  deletar = () => {
    const lancamento = this.state.lancamentoDeletar;
    const id = lancamento.id;
    this.service
      .deletar(id)
      .then((response) => {
        const lancamentos = this.state.lancamentos;
        const index = lancamentos.indexOf(lancamento);
        lancamentos.splice(index, 1);
        this.setState({ lancamentos, showConfirmDialog: false });
        mensagemSucesso(`Lançamento ${id} deletado com sucesso!`);
      })
      .catch((error) => {
        mensagemErro(error.response.data);
      });
  };

  cancelarDelecao = () => {
    this.setState({ showConfirmDialog: false });
  };

  render() {
    const footer = (
      <div>
        <Button
          label="Confirmar"
          icon="p-button-icon p-c pi pi-check"
          onClick={this.deletar}
          className="p-button p-component p-button-rounded p-button-success p-button-outlined p-button-icon-only"
        />
        <Button
          icon="pi pi-times"
          onClick={this.cancelarDelecao}
          className="p-button-danger p-button-rounded"
        />
      </div>
    );
    const meses = this.service.obterListaMeses();
    const tipos = this.service.obterListaTipos();
    const status = this.service.obterListaStatus();

    return (
      <Card title="Consulta Lançamentos">
        <div className="row">
          <div className="col-md-6">
            <div className="bs-component">
              <FormGroup htmlFor="inputAno" label="Ano: *">
                <input
                  type="text"
                  value={this.state.ano}
                  onChange={(e) => this.setState({ ano: e.target.value })}
                  className="form-control"
                  id="inputAno"
                  name="ano"
                  placeholder="Digite o Ano"
                />
              </FormGroup>
              <FormGroup
                htmlFor="inputDescricao"
                label="Descrição do Lançamento: "
              >
                <input
                  type="text"
                  id="selecDescricao"
                  value={this.state.descricao}
                  onChange={(e) => this.setState({ descricao: e.target.value })}
                  className="form-control"
                  placeholder="Digite Descrição do Lançamento"
                />
              </FormGroup>
              <FormGroup htmlFor="inputAno" label="Mês: ">
                <SelectMenu
                  id="selectMes"
                  value={this.state.mes}
                  onChange={(e) => this.setState({ mes: e.target.value })}
                  className="form-control"
                  lista={meses}
                />
              </FormGroup>

              <FormGroup htmlFor="inputTipo" label="Tipo Lançamento: ">
                <SelectMenu
                  id="selectTipo"
                  value={this.state.tipo}
                  onChange={(e) => this.setState({ tipo: e.target.value })}
                  className="form-control"
                  lista={tipos}
                />
              </FormGroup>

              <FormGroup htmlFor="inputStatus" label="Status Lançamento: ">
                <SelectMenu
                  id="selectStatus"
                  value={this.state.status}
                  onChange={(e) => this.setState({ status: e.target.value })}
                  className="form-control"
                  lista={status}
                />
              </FormGroup>
              <div style={{ padding: '10px' }}>
                <Button
                  label="Buscar"
                  icon="p-button-icon p-c pi pi-search"
                  onClick={this.buscar}
                  className="p-button p-component p-button-rounded p-button-success p-button-icon-only"
                />
                <Button
                  label="Cadastrar"
                  icon="p-button-icon p-c pi pi-plus"
                  onClick={this.buscar}
                  className="p-button p-component p-button-rounded p-button-primary p-button-icon-only"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{ padding: '10px' }}>
          <div className="col-md-12">
            <div className="bs-component">
              <LancamentosTable
                lancamentos={this.state.lancamentos}
                deleteAction={this.abrirConfirmacao}
                editAction={this.editar}
              ></LancamentosTable>
            </div>
          </div>
        </div>
        <div>
          <Dialog
            header="Dialog"
            visible={this.state.showConfirmDialog}
            modal={true}
            onHide={this.cancelarDelecao}
            footer={footer}
          >
            Confirma a exclusão deste Lançamento?
          </Dialog>
        </div>
      </Card>
    );
  }
}

export default withRouter(ConsultaLancamentos);
