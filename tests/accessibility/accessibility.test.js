// filepath: tests/accessibility/accessibility.test.js
import AxeBuilder from '@axe-core/webdriverio';
import { axeConfig } from './config/axeConfig.js';
import { AccessibilityReportGenerator } from './utils/reportGenerator.js';

describe('Accessibility Audit', () => {
  let url;
  const reportGenerator = new AccessibilityReportGenerator();

  before(() => {
    // Obtener URL de los argumentos de la línea de comandos
    url = process.argv[process.argv.length - 1];
    
    // Validar URL
    try {
      new URL(url);
    } catch (error) {
      throw new Error('Por favor, proporciona una URL válida como último argumento');
    }
  });

  it('debería analizar el cumplimiento de accesibilidad', async () => {
    // Navegar a la URL
    await browser.url(url);
    
    // Esperar a que la página se cargue completamente
    await browser.waitUntil(
      async () => await browser.execute(() => document.readyState === 'complete'),
      {
        timeout: 10000,
        timeoutMsg: 'La página no se cargó completamente'
      }
    );

    // Inicializar AxeBuilder con la configuración
    const builder = new AxeBuilder({ client: browser })
      .withTags(axeConfig.tags);

    // Ejecutar el análisis
    const results = await builder.analyze();
    
    // Generar y guardar el reporte
    await reportGenerator.generateReport(url, results);

    // Asegurarse de que no haya violaciones críticas
    const criticalViolations = results.violations.filter(v => v.impact === 'critical');
    expect(criticalViolations).toHaveLength(
      0,
      `Se encontraron ${criticalViolations.length} violaciones críticas de accesibilidad`
    );
  });
});