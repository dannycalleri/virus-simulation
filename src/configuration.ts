interface IConfiguration {
  colors: {
    infected: number;
    recovered: number;
    healthy: number;
    [key: string]: number;
  }
}

export default {
  colors: {
    infected: 0xd7301f,
    recovered: 0xfc8d59,
    healthy: 0xfef0d9,
  }
} as IConfiguration;
