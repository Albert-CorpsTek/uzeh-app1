import {colors} from 'src/theme';

const statusColor = (status) => {
  switch(status) {
    case 'pendente':
      return colors.contrast3;
    case 'aceita':
      return colors.contrast2;
    case 'negada':
      return colors.contrast4;
    case 'agendada':
      return colors.contrast;
    case 'coletada':
      return colors.orange;
    case 'finalizada':
      return colors.contrast2;
    case 'cancelada':
      return colors.contrast4;
  }
};

export default statusColor;