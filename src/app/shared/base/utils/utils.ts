export class UtilsHelp {

  static retornaPrioridade(prioridade: string | number): string | number {

    let prioridadeStatus: { [key: string | number]: string | number } = {
      'BAIXO': 0,
      'MÉDIA': 1,
      'ALTA': 2,
      0: 'BAIXO',
      1: 'MÉDIA',
      2: 'ALTA'
    }

    return prioridadeStatus[prioridade];
  }

  static retornaStatus(perfil: string | number): string | number {

    let status: { [key: string | number]: string | number } = {
      'ABERTO': 0,
      'EM ANDAMENTO': 1,
      'ENCERRADO': 2,
      0: 'ABERTO',
      1: 'EM ANDAMENTO',
      2: 'ENCERRADO'
    }

    return status[perfil];
  }

  static retornaPerfil(perfil: string | number): string | number {

    let status: { [key: string | number]: string | number } = {
      'ADMIN': 0,
      'CLIENTE': 1,
      'TECNICO': 2,
      0: 'ADMIN',
      1: 'CLIENTE',
      2: 'TECNICO'
    }

    return status[perfil];
  }
}
