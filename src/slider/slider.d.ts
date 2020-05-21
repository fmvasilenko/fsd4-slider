interface SliderOptions {
  outputSelector?: string;
  outputColor?: string;
}

interface SliderGlobalOptions {
  options: SliderOptions;
}

/**
 * Function to apply the example plugin to the selected elements of a jQuery result.
 */
interface SliderFunction {
  /**
   * Apply the example plugin to the elements selected in the jQuery result.
   *
   * @ param options Options to use for this application of the example plugin.
   * @ returns jQuery result.
   */
  (options: SliderOptions): JQuery;
}

/**
 * Declaration of the example plugin.
 */
interface Slider extends SliderGlobalOptions, SliderFunction { }

/**
 * Extend the jQuery result declaration with the example plugin.
 */
interface JQuery {
  /**
   * Extension of the example plugin.
   */
  slider: Slider;
}