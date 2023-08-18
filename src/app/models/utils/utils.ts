

export class prioridadeStatus {

  prioridade: { [key: string | number]: string | number } = {
    'BAIXO': 0,
    'MÉDIA': 1,
    'ALTA': 2,
    0: 'BAIXO',
    1: 'MÉDIA',
    2: 'ALTA'
  }
}


export class retornaStatus {

  status: { [key: string | number]: string | number } = {
    'ABERTO': 0,
    'EM ANDAMENTO': 1,
    'ENCERRADO': 2,
    0: 'ABERTO',
    1: 'EM ANDAMENTO',
    2: 'ENCERRADO'
  }
}
