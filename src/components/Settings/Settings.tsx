import { Stack } from "../Stack";
import { Text } from "../Text";
import { Button } from "../Button";
import { Toggle } from "../Toggle";
import { Divider } from "../Divider";
import css from "./settings.module.css";

export function Settings() {
  return (
    <Stack rs ps lg className={css.settings}>
      <Stack h center>
        <Stack f sm>
          <Text as="h3">Flags</Text>
          <Text>Controls the final regex flags</Text>
        </Stack>
        <Stack h sm>
          <Button>Global</Button>
          <Button>Multi line</Button>
          <Button>Single line</Button>
          <Button>Insensitive</Button>
          <Button>Unicode</Button>
          <Button>Ungreedy</Button>
        </Stack>
      </Stack>

      <Stack>
        <Stack h lg start>
          <Stack sm start>
            <Text as="h3">Custom patterns</Text>
            <Stack lg start>
              <Text>
                You can add your own color blocks with custom matchers
              </Text>
              <Button>Add new custom pattern</Button>
            </Stack>
          </Stack>
          <Stack sm f>
            <Stack h sm>
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
            <Stack h sm>
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
            <Stack h sm>
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
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
