import { functions } from ".";

export async function execute(
  id: string,
  data: Record<string, any>,
  async = true
) {
  await functions.createExecution(id, JSON.stringify(data), async);
}
