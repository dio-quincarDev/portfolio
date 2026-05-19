/**
 * Simple parser to extract values from Prometheus plain text format.
 * Format example: metric_name{label="value"} 123.45
 */
export const parsePrometheus = (data) => {
  const lines = data.split('\n');
  const metrics = {};

  lines.forEach(line => {
    if (line && !line.startsWith('#')) {
      const [keyVal, value] = line.split(' ');
      const name = keyVal.split('{')[0];
      
      // Store the numeric value
      metrics[name] = parseFloat(value);
      
      // Also store with full key for specific labels if needed
      metrics[keyVal] = parseFloat(value);
    }
  });

  return metrics;
};
