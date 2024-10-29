/**
 * Picks specified properties from an object and returns a new object with those properties.
 * @param obj The source object from which properties are to be picked.
 * @param props An array of property names to pick from the source object.
 * @returns A new object with only the specified properties.
 */
export default function pickProperties<T extends object, K extends keyof T>(
  obj: T,
  props: K[]
): Pick<T, K> {
  return props.reduce(
    (result, prop) => {
      if (prop in obj) {
        result[prop] = obj[prop];
      }
      
      return result;
    },
    {} as Pick<T, K>
  );
}
