import { send } from '@sapphire/plugin-editable-commands';
import { EmbedBuilder, type Message } from 'discord.js';
import { RandomLoadingMessage } from './constants';

/**
 * Picks a random item from an array
 * @param array The array to pick a random item from
 * @example
 * const randomEntry = pickRandom([1, 2, 3, 4]) // 1
 */
export function pickRandom<T>(array: readonly T[]): T {
	const { length } = array;
	return array[Math.floor(Math.random() * length)];
}

/**
 * Sends a loading message to the current channel
 * @param message The message data for which to send the loading message
 */
export function sendLoadingMessage(message: Message): Promise<typeof message> {
	return send(message, { embeds: [new EmbedBuilder().setDescription(pickRandom(RandomLoadingMessage)).setColor('#FF0000')] });
}

/**
 *
 * @param bytes The bytes you want to convert
 * @returns Bytes, KB, MB, GB, TB
 */

export function bytesToSize(bytes: number): string {
	const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes === 0) return 'n/a';
	const i: number = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
	if (i === 0) return `${bytes} ${sizes[i]}`;
	return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}
