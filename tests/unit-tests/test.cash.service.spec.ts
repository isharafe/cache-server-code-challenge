test("some test", () => {
    expect(1 + 2).toBe(3);
});

test("environment test", () => {
    const environment = process.env.NODE_ENV;
    expect(environment).toBe("test");
});