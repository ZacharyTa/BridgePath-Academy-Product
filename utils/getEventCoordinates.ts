export const getEventCoordinates = (
  event:
    | React.MouseEvent<HTMLButtonElement>
    | React.ChangeEvent<HTMLInputElement>,
) => {
  if ("clientX" in event) {
    return {
      x: event.clientX,
      y: event.clientY,
    };
  } else {
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  }
};
