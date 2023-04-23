import { Stack } from "../Stack";
import { Text } from "../Text";
import { Button } from "../Button";
import { Toggle } from "../Toggle";
import { Divider } from "../Divider";
import css from "./settings.module.css";

export function Settings() {
  return (
    <Stack rs ps className={css.settings} gap="lg">
      <Stack h center gap="sm">
        <Stack f gap="sm">
          <Text as="h3">Flags</Text>
          <Text>Controls the final regex flags</Text>
        </Stack>
        <Stack h gap="sm">
          <Button>Global</Button>
          <Button>Multi line</Button>
          <Button>Single line</Button>
          <Button>Insensitive</Button>
          <Button>Unicode</Button>
          <Button>Ungreedy</Button>
        </Stack>
      </Stack>
      <Divider />
      <Stack>
        <Stack h gap="lg" start>
          <Stack gap="sm" start>
            <Text as="h3">Custom patterns</Text>
            <Stack gap="lg" start>
              <Text>You can add your own color custom matchers</Text>
            </Stack>
          </Stack>
          <Stack f gap="md">
            <Stack h gap="sm">
              <Button style={{ flex: 1 }}>IP Address</Button>
              <Button style={{ flex: 1 }}>
                ((?:[a-fA-F\d]{4}\.){2}[a-fA-F\d]{4})
              </Button>
              <Toggle on={true}>g</Toggle>
              <Toggle on={false}>m</Toggle>
              <Toggle on={true}>u</Toggle>
              <Toggle on={false}>i</Toggle>
              <Button danger>✕</Button>
            </Stack>
            <Divider />
            <Stack h gap="sm">
              <Button style={{ flex: 1 }}>Hex Number</Button>
              <Button style={{ flex: 1 }}>
                ((?:[a-fA-F\d]{4}\.){2}[a-fA-F\d]{4})
              </Button>
              <Toggle on={true}>g</Toggle>
              <Toggle on={false}>m</Toggle>
              <Toggle on={false}>u</Toggle>
              <Toggle on={true}>i</Toggle>
              <Button danger>✕</Button>
            </Stack>
            <Divider />
            <Stack h gap="sm">
              <Button style={{ flex: 1 }}>Mac address</Button>
              <Button style={{ flex: 1 }}>
                ((?:[a-fA-F\d]{4}\.){2}[a-fA-F\d]{4})
              </Button>
              <Toggle on={false}>g</Toggle>
              <Toggle on={true}>m</Toggle>
              <Toggle on={false}>u</Toggle>
              <Toggle on={false}>i</Toggle>
              <Button danger>✕</Button>
            </Stack>
            <Divider />
            <Stack end>
              <Button>Add new custom pattern</Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
