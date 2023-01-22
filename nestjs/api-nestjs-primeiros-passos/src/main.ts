import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { AppModule } from './app.module';

const SWAGGER_ENVS = ['local', 'dev', 'staging'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.enableCors(
    { 
      origin: ['https://betterjavacode.com', 'https://www.google.com'],
      methods: ['POST', 'PUT', 'DELETE', 'GET']
    }
  );

  if (SWAGGER_ENVS.includes(process.env.NODE_ENV)) {
    app.use(['/docs', '/docs-json'], basicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }));

    const config = new DocumentBuilder()
    .setTitle('API nestjs primeiros passos')
    .setVersion('1.0')
    .addTag('Auth', 'Recursos relacionados a autenticação.')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .setDescription('<h3>API de recursos relacionados à <i>API nestjs primeiros passos</i> desenvolvida por Igor Lage.</h3><br><hr><h3>Baixe a documentação para insuminia</h3><a href="https://insomnia.rest/run/?label=My%20API&uri=http%3A%2F%2Flocalhost%3A3000%2Fapi-json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a><hr><h3>Explanação</h3><p>Esta API faz parte de uma gama de recursos complexos e que operam entre si para gerenciar e armazenar dados dos aplicativos desenvolvidos pela Hostwit.<br><i>Data de implantação: 2023</i><br><i>Desenvolvedor responsável: Igor Lage</i></p><hr><h3>Atorização é necessária para ter acesso à recursos específicos.</h3>')
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(process.env.PORT || 3000)
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`See the documentation on: ${await app.getUrl()}/docs`);
  console.log(`Download documentation from: ${await app.getUrl()}/docs-json`);

}
bootstrap();