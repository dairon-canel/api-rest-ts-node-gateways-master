describe('Peripheral device', () => {
  describe('create peripheral', () => {
    describe('given a serial number of a gateway', () => {
      describe('that has less than 10 peripherals', () => {
        it('should create a peripheral device', () => {});
      });
      describe('that has 10 or more peripherals', () => {
        it('should return a 400 error with the text "No more than 10 peripheral devices are allowed for a gateway."', () => {});
      });
    });
  });
});
