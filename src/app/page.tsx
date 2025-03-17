"use client";
import { RoundedButton } from "@/components/RoundedButton";
import { invoke } from "@tauri-apps/api/core";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { register } from '@tauri-apps/plugin-global-shortcut';
import { exit } from '@tauri-apps/plugin-process';

import { Menu } from '@tauri-apps/api/menu';

export default function Home() {
  const [greeted, setGreeted] = useState<string | null>(null);
  const greet = useCallback((): void => {
    invoke<string>("greet")
      .then((s) => {
        setGreeted(s);
      })
      .catch((err: unknown) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const registerShortcut = async () => {
      await register('CommandOrControl+Shift+X', () => {
        console.log('Shortcut triggered');
        // exit
        exit(0).catch((err: unknown) => {
          console.error("Failed to exit:", err);
        });
      });
    };
    registerShortcut().catch((err: unknown) => {
      console.error("Failed to register shortcut:", err);
    });

    const createMenu = async () => {
      const menu = await Menu.new({
        items: [
          {
            id: 'system',
            text: 'System',
            items: [
              {
                id: 'quit',
                text: '退出',
                action: () => {
                  console.log('quit pressed');
                  // exit
                  exit(0).catch((err: unknown) => {
                    console.error("Failed to exit:", err);
                  });
                },
              }
            ],
          },
          {
            id: 'window',
            text: 'Widnow',
            items: [
              {
                id: 'quit2',
                text: 'Quit',
                action: () => {
                  console.log('quit pressed');
                  // exit
                  exit(0).catch((err: unknown) => {
                    console.error("Failed to exit:", err);
                  });
                },
              }
            ],
          },
          {
            id: 'help',
            text: 'Help',
            items: [
              {
                id: 'quit3',
                text: 'Quit',
                action: () => {
                  console.log('quit pressed');
                  // exit
                  exit(0).catch((err: unknown) => {
                    console.error("Failed to exit:", err);
                  });
                },
              },
              {
                item: 'Separator',
              },
              {
                id: 'quit5',
                text: 'Quit',
                action: () => {
                  console.log('quit pressed');
                  // exit
                  exit(0).catch((err: unknown) => {
                    console.error("Failed to exit:", err);
                  });
                },
              },
            ],
          },
        ],
      });
      menu.setAsAppMenu().then((res) => {
        console.log('menu set success', res);
      }).catch((err: unknown) => {
        console.error("Failed to set menu:", err);
      });
    };
    createMenu().catch((err: unknown) => {
      console.error("Failed to create menu:", err);
    });

  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex flex-col gap-2 items-start">
          <RoundedButton
            onClick={greet}
            title="Call &quot;greet&quot; from Rust"
          />
          <p className="break-words w-md">
            {greeted ?? "Click the button to call the Rust function"}
          </p>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
