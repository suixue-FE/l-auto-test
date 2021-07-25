import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 配置全局拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());
  // swagger文档
  const options = new DocumentBuilder()
    .setTitle('自动化测试')
    .setDescription('自动化测试接口文档')
    .setVersion('1.0')
    .addTag('l')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(7007);
}
bootstrap();
